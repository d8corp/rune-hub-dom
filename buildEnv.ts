/* eslint-disable no-console,import/no-nodejs-modules */
import cssnano from 'cssnano'
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import postcss from 'postcss'
import selectorParser from 'postcss-selector-parser'
import * as sass from 'sass'

const INPUT_SCSS = 'theme.scss'
const OUTPUT_ENV = '.env'
const RD_THEME__PREFIX = process.env.RD_THEME__PREFIX ?? 'rd_'
const ENV_PREFIX = 'RD_THEME_'
const GLOBAL_AT_RULES = ['keyframes', 'font-face', 'property', 'layer', 'charset']

const globalTransformer = selectorParser((selectors) => {
  selectors.walkClasses((classNode) => {
    let isInsideGlobal = false
    let parent = classNode.parent

    while (parent) {
      if (parent.type === 'pseudo' && parent.value === ':global') {
        isInsideGlobal = true
        break
      }

      parent = parent.parent
    }

    if (!isInsideGlobal) {
      classNode.value = RD_THEME__PREFIX + classNode.value
    }
  })

  selectors.walkPseudos((pseudo) => {
    if (pseudo.value === ':global') {
      if (pseudo.nodes && pseudo.nodes.length > 0) {
        const clones = pseudo.nodes.map(n => n.clone())
        pseudo.replaceWith(...clones)
      } else {
        pseudo.remove()
      }
    }
  })
})

function transformSelector (sel: string): string {
  return globalTransformer.processSync(sel)
}

async function minifyCss (css: string): Promise<string> {
  const result = await postcss([cssnano({ preset: 'default' })]).process(css, { from: undefined })

  return result.css
}

async function generateEnvFromScss () {
  console.log('Starting env from scss')

  const compiledCss = sass.compile(INPUT_SCSS).css
  const root = postcss.parse(compiledCss)

  root.walkRules(rule => {
    rule.selectors = rule.selectors.map(transformSelector)
  })

  const globalNodes: postcss.ChildNode[] = []

  const componentRegex = new RegExp(`^\\.${RD_THEME__PREFIX}((?:[a-zA-Z0-9-]|_(?!_))+)`)

  root.walk(node => {
    if (node.type === 'atrule') {
      if (GLOBAL_AT_RULES.includes(node.name)) {
        globalNodes.push(node.clone())
        node.remove()
      }
    } else if (node.type === 'rule') {
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

      if (componentSelectors.length > 0) {
        node.selectors = componentSelectors
      } else {
        node.remove()
      }
    }
  })

  root.walk(node => {
    if (node.type === 'atrule' && node.nodes && node.nodes.length === 0) {
      node.remove()
    }
  })

  const components = new Set<string>()

  root.walkRules(rule => {
    rule.selectors.forEach(sel => {
      const match = sel.match(componentRegex)

      if (match) {
        components.add(match[1])
      }
    })
  })

  console.log(`Found components: ${components.size}`)
  console.log(`Found global nodes: ${globalNodes.length}`)

  const envVariables: Record<string, string> = {}

  const filterRegexCache = new Map<string, RegExp>()

  for (const comp of components) {
    const clonedRoot = root.clone()

    clonedRoot.walk(node => {
      if (node.type === 'rule') {
        let regex = filterRegexCache.get(comp)

        if (!regex) {
          const escapedComp = comp.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
          regex = new RegExp(`^\\.${RD_THEME__PREFIX}${escapedComp}(?:__|[^a-zA-Z0-9_-]|$)`)
          filterRegexCache.set(comp, regex)
        }

        const validSelectors = node.selectors.filter(sel => regex.test(sel))

        if (!validSelectors.length) {
          node.remove()
        } else {
          node.selectors = validSelectors
        }
      } else if (node.type === 'atrule' && node.nodes && !node.nodes.length) {
        node.remove()
      }
    })

    const componentCss = await minifyCss(clonedRoot.toResult().css)

    if (componentCss) {
      const envKey = `${ENV_PREFIX}${comp.toUpperCase().replace(/-/g, '_')}`
      envVariables[envKey] = `'${componentCss}'`
    }
  }

  const existingContent = fs.existsSync(OUTPUT_ENV) ? fs.readFileSync(OUTPUT_ENV, 'utf-8') : ''
  const existingVars = dotenv.parse(existingContent)
  const finalVars = { ...existingVars }
  let updatedCount = 0

  for (const [key, value] of Object.entries(envVariables)) {
    if (finalVars[key] !== undefined) {
      updatedCount++
    }

    finalVars[key] = value
  }

  if (globalNodes.length > 0) {
    const globalRoot = postcss.root()
    globalRoot.append(globalNodes)
    const globalCss = await minifyCss(globalRoot.toResult().css)

    if (globalCss) {
      finalVars[`${ENV_PREFIX}_ROOT`] = `'${globalCss}'`
    }
  }

  finalVars[`${ENV_PREFIX}_PREFIX`] = RD_THEME__PREFIX

  const finalContent = Object.entries(finalVars)
    .map(([key, value]) => {
      if (value.includes('\n')) {
        return `${key}="${value.replace(/"/g, '\\"')}"`
      }

      return `${key}=${value}`
    })
    .join('\n')

  fs.writeFileSync(OUTPUT_ENV, finalContent, 'utf-8')

  console.log(`✅ Successful updated ${OUTPUT_ENV} (Updated: ${updatedCount}, Added: ${Object.keys(envVariables).length - updatedCount})`)
}

generateEnvFromScss().catch(console.error)
