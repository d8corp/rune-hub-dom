import { classes } from 'html-classes'
import Prism from 'prismjs'
import { Slot } from 'rune-hub'

import { Show } from '../../../components'
import { message } from '../../../helpers'
import { useEffect, useStyles } from '../../../hooks'
import type { JSXElement, ObservableProp } from '../../../types'
import type { FlexElement, FlexProps, FlexStyles } from '../../../ui'
import { Button, CopyIcon, Flex, HtmlIcon, JsonIcon, Markdown, SuccessIcon, TerminalIcon, TypeScriptIcon, Typography } from '../../../ui'
import { inject, injectAll, Ref, use, viewTransition } from '../../../utils'
import $styles from './Highlight.module.scss'

export type HighlightExamples = Record<string, JSXElement>

const icons = {
  ts: <TypeScriptIcon />,
  tsx: <TypeScriptIcon />,
  shell: <TerminalIcon />,
  html: <HtmlIcon />,
  json: <JsonIcon />,
} satisfies Record<string, JSXElement>

export type HighlightProps<T extends FlexElement = 'div'> = FlexProps<T, typeof $styles & FlexStyles> & {
  code: string
  lang: string
  glow?: ObservableProp<boolean>
  examples?: HighlightExamples
}

export function Highlight<T extends FlexElement = 'div'> ({
  code,
  lang,
  glow,
  examples,
  ...props
}: HighlightProps<T>) {
  const styles = useStyles($styles, props.class)
  const ref = new Ref<HTMLPreElement>()
  const copied = new Slot(function copied () { return false })
  const example = new Slot(function example () { return '' })
  let copyTimer: any

  const hasLand = lang in Prism.languages

  const rawData = code.trim().split('//!').map((line, index) => {
    if (!index) return ['', line]

    const titleRaw = line.split('\n', 1)[0]
    const code = line.slice(titleRaw.length)
    const title = titleRaw.trim()

    return [title, code]
  })

  const [[, sharedCode], ...tabs] = rawData.length > 1 ? rawData : [['', ''], ...rawData]

  const hasTabs = Boolean(sharedCode) || Boolean(tabs.length > 1)

  const copy = (codeText: ObservableProp<string>) => () => {
    navigator.clipboard.writeText(use(codeText))

    viewTransition(() => {
      copied.value = true
      message('Copied to clipboard')
    })

    clearTimeout(copyTimer)

    copyTimer = setTimeout(() => {
      copied.value = false
    }, 1000)
  }

  const IconCopy = () => () => {
    return copied.value ? <SuccessIcon /> : <CopyIcon />
  }

  const Content = () => {
    if (!hasTabs) {
      const codeText = tabs[0][1].trim()

      if (hasLand) {
        useEffect(() => {
          if (ref.value) {
            ref.value.innerHTML = Prism.highlight(codeText, Prism.languages[lang], lang)
          }
        })
      }

      return (
        <>
          <Flex vertical class={styles.header}>
            <Flex padding={[12, 16]} class={styles.title} gap={8} align='center'>
              {inject(lang, lang => icons[lang as keyof typeof icons])}
              <Typography class={styles.titleText} flex>
                <Markdown text={tabs.length === 1 ? tabs[0][0] : tabs[1][0]} />
              </Typography>
              <Button size='s' data-glow={glow} square color='secondary' onclick={copy(codeText)}>
                <IconCopy />
              </Button>
            </Flex>
          </Flex>
          <div class={styles.code}>
            <pre
              class={inject(lang, lang => `language-${lang}`)}
              ref={ref}
            >
              {!hasLand && codeText}
            </pre>
          </div>
        </>
      )
    }

    const tab = new Slot(function highlightTab () { return 0 })

    const code = new Slot(function highlightFullCode () {
      const [, currentCode] = tabs[tab.value]

      return sharedCode ? `${sharedCode}${currentCode.trim()}` : currentCode.trim()
    })

    useEffect(() => {
      return new Slot(function renderPrisma () {
        if (!ref.value) return

        const fullCode = code.value

        if (fullCode.startsWith('//>')) {
          const key = fullCode.slice(3).trim()

          if (examples?.[key]) {
            example.set(key)
            ref.value.innerHTML = ''

            return
          }
        }

        example.set('')
        ref.value.innerHTML = hasLand ? Prism.highlight(fullCode, Prism.languages[lang], lang) : fullCode
      }).on()
    })

    return (
      <>
        <Flex vertical class={styles.header}>
          <Flex padding={[12, 16]} class={styles.title} gap={12} align='center'>
            <Flex flex class={styles.tabs}>
              {tabs.map(([title], index) => (
                <span
                  class={() => classes([styles.tab, index === tab.value && styles.selected])}
                  onclick={() => tab.set(index)}
                >
                  {title}
                </span>
              ))}
            </Flex>
            <Show when={() => code.value && !code.value.startsWith('//>')}>
              <Button data-glow={glow} square color='secondary' size='s' onclick={copy(code)}>
                <IconCopy />
              </Button>
            </Show>
          </Flex>
        </Flex>
        <div class={styles.code}>
          {() => examples?.[example.value]}
          <pre class={inject(lang, lang => `language-${lang}`)} ref={ref} />
        </div>
      </>
    )
  }

  return (
    <Flex<T>
      vertical {...(props as any)} class={injectAll([
        styles.root,
        inject(glow, glow => glow && styles.glow),
      ], classes)}
    >
      <Content />
    </Flex>
  )
}
