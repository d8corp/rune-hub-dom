/* eslint-disable no-console,import/no-nodejs-modules */
import { createHash } from 'crypto'
import cssnano from 'cssnano'
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import postcss from 'postcss'
import selectorParser from 'postcss-selector-parser'
import * as sass from 'sass'

const INPUT_SCSS = 'theme.scss'
const OUTPUT_ENV = '.env.theme'
const RD_PREFIX = process.env.RD_THEME__PREFIX || 'rd_'
const ENV_PREFIX = 'RD_THEME_'
const GLOBAL_AT_RULES = new Set(['font-face', 'property', 'layer', 'charset'])
const KEYFRAMES_RE = /^(?:-[a-z]+-)?keyframes$/i
const ANIMATION_PROP_RE = /^(?:-[a-z]+-)?animation(?:-name)?$/i
const IDENT_RE = /-?[_a-zA-Z][\w-]*/g
const VIEW_TRANSITION_RE = /^::?view-transition-/
const VT_DECL_RE = /^view-transition-(?:name|class)$/i
const VT_CLASS_PROP_RE = /^view-transition-class$/i
const VT_NAME_KEYWORDS = new Set(['none', 'auto', 'match-element'])

const escapeRegExp = (s: string) => s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
const PREFIX_RE = escapeRegExp(RD_PREFIX)
const componentRegex = new RegExp(`^\\.${PREFIX_RE}([a-zA-Z0-9-]+)`)
const PREFIXED_NAME_RE = new RegExp(`^${PREFIX_RE}([a-zA-Z0-9-]+)`)

const GLOBAL_OWNER = null
type Owner = string | typeof GLOBAL_OWNER

const toEnvKey = (name: string) => name.toUpperCase().replace(/-/g, '_')
const hash = (s: string) => createHash('sha256').update(s).digest('hex').slice(0, 6)

const minifier = postcss([cssnano({ preset: 'default' })])
const minifyCss = async (css: string) => (await minifier.process(css, { from: undefined })).css

// ---------- helpers ----------

type WithParent = { parent?: any }

function hasAncestor (node: WithParent, test: (p: any) => boolean): boolean {
  for (let p = node.parent; p; p = p.parent) {
    if (test(p)) return true
  }

  return false
}

const isInsideGlobalAtRule = (node: postcss.Node) =>
  hasAncestor(node, p => p.type === 'atrule' && GLOBAL_AT_RULES.has(p.name))

const isGlobalPseudo = (n: any) =>
  n.type === 'pseudo' && (n.value === ':global' || VIEW_TRANSITION_RE.test(n.value))

/** Wraps a clone of `source` into clones of its @media/@supports/... ancestors. */
function wrapInAtRuleAncestors (
  source: postcss.ChildNode,
  node: postcss.ChildNode = source.clone(),
): postcss.ChildNode {
  for (let p: any = source.parent; p?.type === 'atrule'; p = p.parent) {
    node = (p as postcss.AtRule).clone().removeAll().append(node)
  }

  return node
}

function getComponents (rule: postcss.Rule): string[] {
  return rule.selectors
    .map(sel => sel.match(componentRegex)?.[1])
    .filter((c): c is string => Boolean(c))
}

// ---------- view-transition ownership ----------

function getViewTransitionNames (selector: string): string[] {
  const names: string[] = []

  selectorParser((selectors) => {
    selectors.walkPseudos((pseudo) => {
      if (!VIEW_TRANSITION_RE.test(pseudo.value)) return

      pseudo.walk((n) => {
        if (n.type === 'class') names.push(`.${n.value}`)
        else if (n.type === 'tag') names.push(n.value)
        else if (n.type === 'universal') names.push('*')
      })
    })
  }).processSync(selector)

  return names
}

function collectViewTransitionNameOwners (root: postcss.Root): Map<string, Set<Owner>> {
  const owners = new Map<string, Set<Owner>>()

  root.walkDecls(VT_DECL_RE, (decl) => {
    const isClass = VT_CLASS_PROP_RE.test(decl.prop)

    const keys = decl.value.trim().split(/\s+/)
      .filter(v => v && !VT_NAME_KEYWORDS.has(v))
      .map(v => (isClass ? `.${v}` : v))

    if (!keys.length) return

    const components = decl.parent?.type === 'rule' ? getComponents(decl.parent as postcss.Rule) : []

    for (const key of keys) {
      const set = owners.get(key) ?? new Set<Owner>()

      for (const o of components.length ? components : [GLOBAL_OWNER]) set.add(o)
      owners.set(key, set)
    }
  })

  return owners
}

function resolveSelectorOwner (selector: string, nameOwners: Map<string, Set<Owner>>): Owner {
  const names = getViewTransitionNames(selector)
  if (!names.length) return GLOBAL_OWNER

  const all = new Set<Owner>()

  for (const name of names) {
    if (name === '*' || name === 'root') return GLOBAL_OWNER
    const declared = nameOwners.get(name)

    if (declared) declared.forEach(o => all.add(o))
    else all.add(name.match(PREFIXED_NAME_RE)?.[1] ?? GLOBAL_OWNER)
  }

  const [owner] = all

  return all.size === 1 ? owner : GLOBAL_OWNER
}

// ---------- selector transform (:global unwrapping + prefixing) ----------

function createSelectorTransformer (classList: Record<string, string>) {
  return selectorParser((selectors) => {
    selectors.walkClasses((cls) => {
      if (hasAncestor(cls, isGlobalPseudo)) return
      const [component, element = 'root'] = cls.value.split('_')
      cls.value = RD_PREFIX + cls.value
      classList[`${ENV_PREFIX}${toEnvKey(component)}__${toEnvKey(element)}`] = cls.value
    })

    selectors.walkPseudos((pseudo) => {
      if (pseudo.value === ':global') {
        pseudo.replaceWith(...pseudo.nodes.map(n => n.clone())) // no args = remove()
      }
    })
  })
}

// ---------- keyframes: hashing, renaming, extraction ----------

/**
 * Renames every @keyframes to `${RD_PREFIX}${name}-${hash}`, rewrites animation references
 * and removes keyframes from root. Returns wrapped keyframe nodes keyed by the new name.
 */
function extractKeyframes (root: postcss.Root): Map<string, postcss.ChildNode[]> {
  const byName = new Map<string, postcss.AtRule[]>()

  root.walkAtRules(KEYFRAMES_RE, (atRule) => {
    byName.set(atRule.params, [...(byName.get(atRule.params) ?? []), atRule])
  })

  const renamed = new Map<string, string>()

  for (const [name, atRules] of byName) {
    renamed.set(name, `${RD_PREFIX}${name}-${hash(atRules.map(String).join(''))}`)
  }

  root.walkDecls(ANIMATION_PROP_RE, (decl) => {
    decl.value = decl.value.replace(IDENT_RE, token => renamed.get(token) ?? token)
  })

  const keyframes = new Map<string, postcss.ChildNode[]>()

  for (const [name, atRules] of byName) {
    const newName = renamed.get(name)!

    keyframes.set(newName, atRules.map((atRule) => {
      atRule.params = newName
      const wrapped = wrapInAtRuleAncestors(atRule)
      atRule.remove()

      return wrapped
    }))
  }

  return keyframes
}

/** For each keyframe name, collects the set of owners (component names or GLOBAL_OWNER) referencing it. */
function collectKeyframeOwners (
  componentRoot: postcss.Root,
  globalRoot: postcss.Root,
  viewTransitions: Map<string, postcss.ChildNode[]>,
  names: Set<string>,
): Map<string, Set<Owner>> {
  const owners = new Map<string, Set<Owner>>()

  const track = (container: postcss.Root, getOwners: (decl: postcss.Declaration) => Owner[]) => {
    container.walkDecls(ANIMATION_PROP_RE, (decl) => {
      const used = (decl.value.match(IDENT_RE) ?? []).filter(token => names.has(token))
      if (!used.length) return
      const declOwners = getOwners(decl)

      for (const name of used) {
        const set = owners.get(name) ?? new Set<Owner>()
        declOwners.forEach(o => set.add(o))
        owners.set(name, set)
      }
    })
  }

  track(globalRoot, () => [GLOBAL_OWNER])

  track(componentRoot, (decl) => {
    const components = decl.parent?.type === 'rule' ? getComponents(decl.parent as postcss.Rule) : []

    return components.length ? components : [GLOBAL_OWNER]
  })

  for (const [component, nodes] of viewTransitions) {
    track(postcss.root().append(nodes.map(n => n.clone())), () => [component])
  }

  return owners
}

// ---------- split root into global nodes, component rules and component view-transitions ----------

function splitGlobalAndComponentRules (root: postcss.Root) {
  const components = new Set<string>()
  const candidates: { owner: Owner, node: postcss.ChildNode }[] = []
  const nameOwners = collectViewTransitionNameOwners(root)

  root.walk((node) => {
    if (isInsideGlobalAtRule(node)) return

    if (node.type === 'atrule' && GLOBAL_AT_RULES.has(node.name)) {
      candidates.push({ owner: GLOBAL_OWNER, node: node.clone() })
      node.remove()

      return
    }

    if (node.type !== 'rule') return

    const globalByOwner = new Map<Owner, string[]>()
    const componentSelectors: string[] = []

    for (const sel of node.selectors) {
      const match = sel.match(componentRegex)

      if (match) {
        componentSelectors.push(sel)
        components.add(match[1])
      } else {
        const owner = resolveSelectorOwner(sel, nameOwners)
        globalByOwner.set(owner, [...(globalByOwner.get(owner) ?? []), sel])
      }
    }

    for (const [owner, selectors] of globalByOwner) {
      candidates.push({ owner, node: wrapInAtRuleAncestors(node, node.clone({ selectors })) })
    }

    if (componentSelectors.length) node.selectors = componentSelectors
    else node.remove()
  })

  const globalNodes: postcss.ChildNode[] = []
  const viewTransitions = new Map<string, postcss.ChildNode[]>()

  for (const { owner, node } of candidates) {
    if (owner !== GLOBAL_OWNER && components.has(owner)) {
      viewTransitions.set(owner, [...(viewTransitions.get(owner) ?? []), node])
    } else {
      globalNodes.push(node)
    }
  }

  return { globalNodes, components, viewTransitions }
}

// ---------- per-component CSS ----------

function extractComponentCss (
  root: postcss.Root,
  component: string,
  extras: postcss.ChildNode[] = [],
): Promise<string> {
  const re = new RegExp(`^\\.${PREFIX_RE}${component}(?![a-zA-Z0-9-])`)
  const clone = root.clone()

  clone.walkRules((rule) => {
    const selectors = rule.selectors.filter(sel => re.test(sel))
    if (selectors.length) rule.selectors = selectors
    else rule.remove()
  })

  // Appended after filtering so `from`/`to` rules and ::view-transition-* are not stripped
  clone.prepend(extras.map(n => n.clone()))

  return minifyCss(clone.toString())
}

// ---------- .env read/write ----------

const readEnv = (path: string): Record<string, string> =>
  fs.existsSync(path) ? dotenv.parse(fs.readFileSync(path, 'utf-8')) : {}

function writeEnv (path: string, vars: Record<string, string>): void {
  const content = Object.entries(vars)
    .map(([key, value]) => `${key}='${value.replace(/'/g, "\\'")}'`)
    .join('\n')

  fs.writeFileSync(path, content, 'utf-8')
}

// ---------- main ----------

async function generateEnvFromScss () {
  console.log('Starting env from scss')

  const root = postcss.parse(sass.compile(INPUT_SCSS).css)

  const classList: Record<string, string> = {}
  const transformer = createSelectorTransformer(classList)
  root.walkRules((rule) => { rule.selector = transformer.processSync(rule.selector) })

  const keyframes = extractKeyframes(root)
  const { globalNodes, components, viewTransitions } = splitGlobalAndComponentRules(root)
  const globalRoot = postcss.root().append(globalNodes)

  const owners = collectKeyframeOwners(root, globalRoot, viewTransitions, new Set(keyframes.keys()))
  const componentKeyframes = new Map<string, postcss.ChildNode[]>()

  for (const [name, nodes] of keyframes) {
    const nameOwners = owners.get(name)
    const [owner] = nameOwners ?? []

    if (nameOwners?.size === 1 && owner !== GLOBAL_OWNER && components.has(owner)) {
      componentKeyframes.set(owner, [...(componentKeyframes.get(owner) ?? []), ...nodes])
    } else {
      globalRoot.prepend(nodes)
    }
  }

  const componentExtras = new Map<string, postcss.ChildNode[]>()

  for (const c of components) {
    const extras = [...(componentKeyframes.get(c) ?? []), ...(viewTransitions.get(c) ?? [])]
    if (extras.length) componentExtras.set(c, extras)
  }

  console.log(`Found components: ${components.size}`)
  console.log(`Found global nodes: ${globalNodes.length}`)
  console.log(`Found keyframes: ${keyframes.size} (component-scoped: ${[...componentKeyframes.values()].flat().length})`)
  console.log(`Found component view-transition nodes: ${[...viewTransitions.values()].flat().length}`)

  const nextVars: Record<string, string> = {
    [`${ENV_PREFIX}_PREFIX`]: RD_PREFIX,
    ...classList,
  }

  const globalCss = await minifyCss(globalRoot.toString())
  if (globalCss) nextVars[`${ENV_PREFIX}_ROOT`] = globalCss

  const componentCss = await Promise.all(
    [...components].map(async c => [c, await extractComponentCss(root, c, componentExtras.get(c))] as const),
  )

  for (const [component, css] of componentCss) {
    if (css) nextVars[`${ENV_PREFIX}${toEnvKey(component)}`] = css
  }

  // ---------- merge with existing .env ----------
  const existing = readEnv(OUTPUT_ENV)

  const isStale = (key: string) =>
    key.startsWith(ENV_PREFIX) && !key.startsWith(`${ENV_PREFIX}_`) && !(key in nextVars)

  const nextKeys = Object.keys(nextVars)
  const added = nextKeys.filter(k => !(k in existing)).length
  const updated = nextKeys.filter(k => k in existing && existing[k] !== nextVars[k]).length
  const removed = Object.keys(existing).filter(isStale).length

  const finalVars = {
    ...Object.fromEntries(Object.entries(existing).filter(([k]) => !isStale(k))),
    ...nextVars,
  }

  writeEnv(OUTPUT_ENV, finalVars)
  console.log(`✅ Successfully updated ${OUTPUT_ENV} (Updated: ${updated}, Added: ${added}, Removed: ${removed})`)
}

generateEnvFromScss().catch(console.error)
