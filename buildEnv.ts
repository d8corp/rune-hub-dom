/* eslint-disable no-console,import/no-nodejs-modules */
import cssnano from 'cssnano'
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import postcss from 'postcss'
import selectorParser from 'postcss-selector-parser'
import * as sass from 'sass'

const INPUT_SCSS = 'theme.scss'
const OUTPUT_ENV = '.env'
const RD_PREFIX = process.env.RD_THEME__PREFIX || 'rd_'
const ENV_PREFIX = 'RD_THEME_'
const GLOBAL_AT_RULES = ['keyframes', 'font-face', 'property', 'layer', 'charset']

const componentRegex = new RegExp(`^\\.${RD_PREFIX}((?:[a-zA-Z0-9-]|(?!_))+)`)

// ---------- small helpers ----------

const toEnvKey = (name: string): string => name.toUpperCase().replace(/-/g, '_')

const escapeRegExp = (str: string): string => str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')

/** True if `node` sits anywhere inside one of GLOBAL_AT_RULES (e.g. a `to {}` rule inside `@keyframes`). */
function isInsideGlobalAtRule (node: postcss.Node): boolean {
  let parent = node.parent

  while (parent) {
    if (parent.type === 'atrule' && GLOBAL_AT_RULES.includes((parent as postcss.AtRule).name)) {
      return true
    }

    parent = parent.parent
  }

  return false
}

async function minifyCss (css: string): Promise<string> {
  const result = await postcss([cssnano({ preset: 'default' })]).process(css, { from: undefined })

  return result.css
}

// ---------- selector transform (:global unwrapping + rd_ prefixing) ----------

function makeSelectorTransformer (fullClassList: Record<string, string>) {
  return selectorParser((selectors) => {
    selectors.walkClasses((classNode) => {
      let insideGlobal = false
      let parent = classNode.parent

      while (parent) {
        if (parent.type === 'pseudo' && parent.value === ':global') {
          insideGlobal = true
          break
        }

        parent = parent.parent
      }

      if (!insideGlobal) {
        const [component, element = 'root'] = classNode.value.split('_')

        classNode.value = RD_PREFIX + classNode.value
        fullClassList[`${ENV_PREFIX}${toEnvKey(component)}__${toEnvKey(element)}`] = classNode.value
      }
    })

    selectors.walkPseudos((pseudo) => {
      if (pseudo.value === ':global') {
        if (pseudo.nodes && pseudo.nodes.length > 0) {
          pseudo.replaceWith(...pseudo.nodes.map(n => n.clone()))
        } else {
          pseudo.remove()
        }
      }
    })
  })
}

// ---------- split root into "global" nodes and per-component rules ----------

interface SplitResult {
  globalNodes: postcss.ChildNode[]
  components: Set<string>
}

function splitGlobalAndComponentRules (root: postcss.Root): SplitResult {
  const globalNodes: postcss.ChildNode[] = []
  const components = new Set<string>()

  root.walk((node) => {
    // Already handled as part of a global at-rule clone above us — nothing left to do.
    if (isInsideGlobalAtRule(node)) {
      return
    }

    if (node.type === 'atrule') {
      if (node.nodes && node.nodes.length === 0) {
        node.remove()
      } else if (GLOBAL_AT_RULES.includes(node.name)) {
        globalNodes.push(node.clone())
        node.remove()
      }

      return
    }

    if (node.type !== 'rule') {
      return
    }

    const globalSelectors = node.selectors.filter(sel => !componentRegex.test(sel))
    const componentSelectors = node.selectors.filter(sel => componentRegex.test(sel))

    if (globalSelectors.length > 0) {
      let globalRule: postcss.ChildNode = node.clone()
      globalRule.selectors = globalSelectors

      let parent = node.parent

      while (parent && parent.type === 'atrule') {
        const wrapper = parent.clone()
        wrapper.removeAll()
        wrapper.append(globalRule)
        globalRule = wrapper
        parent = parent.parent
      }

      globalNodes.push(globalRule)
    }

    if (componentSelectors.length === 0) {
      node.remove()

      return
    }

    node.selectors = componentSelectors

    for (const sel of componentSelectors) {
      const match = sel.match(componentRegex)

      if (match) {
        components.add(match[1])
      }
    }
  })

  return { globalNodes, components }
}

// ---------- per-component CSS extraction ----------

async function extractComponentCss (root: postcss.Root, component: string): Promise<string> {
  const clonedRoot = root.clone()
  const regex = new RegExp(`^\\.${RD_PREFIX}${escapeRegExp(component)}(?:_|[^a-zA-Z0-9_-]|$)`)

  clonedRoot.walk((node) => {
    if (node.type === 'rule') {
      const validSelectors = node.selectors.filter(sel => regex.test(sel))

      if (validSelectors.length === 0) {
        node.remove()
      } else {
        node.selectors = validSelectors
      }
    } else if (node.type === 'atrule' && node.nodes && node.nodes.length === 0) {
      node.remove()
    }
  })

  return minifyCss(clonedRoot.toResult().css)
}

// ---------- .env read/write ----------

function readExistingEnv (path: string): Record<string, string> {
  return fs.existsSync(path) ? dotenv.parse(fs.readFileSync(path, 'utf-8')) : {}
}

function writeEnv (path: string, vars: Record<string, string>): void {
  const content = Object.entries(vars)
    .map(([key, value]) => `${key}='${value.replace(/'/g, "\\'")}'`)
    .join('\n')

  fs.writeFileSync(path, content, 'utf-8')
}

// ---------- main ----------

async function generateEnvFromScss () {
  console.log('Starting env from scss')

  const compiledCss = sass.compile(INPUT_SCSS).css
  const root = postcss.parse(compiledCss)
  const fullClassList: Record<string, string> = {}

  root.walkRules(rule => {
    rule.selectors = rule.selectors.map(sel => makeSelectorTransformer(fullClassList).processSync(sel))
  })

  const { globalNodes, components } = splitGlobalAndComponentRules(root)

  console.log(`Found components: ${components.size}`)
  console.log(`Found global nodes: ${globalNodes.length}`)

  const nextVars: Record<string, string> = {
    [`${ENV_PREFIX}_PREFIX`]: RD_PREFIX,
    ...fullClassList,
  }

  if (globalNodes.length > 0) {
    const globalRoot = postcss.root()
    globalRoot.append(globalNodes)
    const globalCss = await minifyCss(globalRoot.toResult().css)

    if (globalCss) {
      nextVars[`${ENV_PREFIX}_ROOT`] = globalCss
    }
  }

  for (const component of components) {
    const componentCss = await extractComponentCss(root, component)

    if (componentCss) {
      nextVars[`${ENV_PREFIX}${toEnvKey(component)}`] = componentCss
    }
  }

  const existingVars = readExistingEnv(OUTPUT_ENV)
  const finalVars: Record<string, string> = { ...existingVars }

  let addedCount = 0
  let updatedCount = 0
  let removedCount = 0

  for (const key of Object.keys(existingVars)) {
    if (key.startsWith(ENV_PREFIX) && !(key in nextVars) && !key.startsWith(`${ENV_PREFIX}_`)) {
      delete finalVars[key]
      removedCount++
    }
  }

  for (const [key, value] of Object.entries(nextVars)) {
    if (!(key in existingVars)) {
      addedCount++
    } else if (existingVars[key] !== value) {
      updatedCount++
    }

    finalVars[key] = value
  }

  writeEnv(OUTPUT_ENV, finalVars)

  console.log(`✅ Successful updated ${OUTPUT_ENV} (Updated: ${updatedCount}, Added: ${addedCount}, Removed: ${removedCount})`)
}

generateEnvFromScss().catch(console.error)
