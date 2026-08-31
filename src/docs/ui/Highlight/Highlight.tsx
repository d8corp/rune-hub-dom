import { classes } from 'html-classes'
import Prism from 'prismjs'
import { Slot } from 'rune-hub'

import { Button } from '../Button'
import type { FlexElement, FlexProps } from '../Flex'
import { Flex } from '../Flex'
import { BaseMarkdown } from '../Markdown/BaseMarkdown'
import { Typography } from '../Typography'

import { useEffect, useStyles } from '../../../hooks'
import type { JSXElement } from '../../../types'
import { inject, Ref } from '../../../utils'
import { CopyIcon, HtmlIcon, JsonIcon, SuccessIcon, TerminalIcon, TypeScriptIcon } from '../../icons'
import $styles from './Highlight.module.scss'

const icons = {
  ts: <TypeScriptIcon />,
  tsx: <TypeScriptIcon />,
  shell: <TerminalIcon />,
  html: <HtmlIcon />,
  json: <JsonIcon />,
} satisfies Record<string, JSXElement>

export type HighlightProps<T extends FlexElement = 'div'> = FlexProps<T, typeof $styles> & {
  code: string
  lang: string
}

export function Highlight<T extends FlexElement = 'div'> ({
  code,
  lang,
  ...props
}: HighlightProps<T>) {
  const styles = useStyles($styles, props.class)
  const ref = new Ref<HTMLPreElement>()
  const copied = new Slot(() => false)
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

      const copy = () => {
        navigator.clipboard.writeText(codeText)
        copied.value = true

        clearTimeout(copyTimer)

        copyTimer = setTimeout(() => {
          copied.value = false
        }, 1000)
      }

      return (
        <>
          <Flex vertical class={styles.header}>
            <Flex padding={[12, 16]} class={styles.title} gap={8} align='center'>
              {inject(lang, lang => icons[lang as keyof typeof icons])}
              <Typography class={styles.titleText} flex>
                <BaseMarkdown text={tabs.length === 1 ? tabs[0][0] : tabs[1][0]} />
              </Typography>
              <Button size='s' view='secondary' onclick={copy}>
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

    const tab = new Slot(() => 0)
    let fullCode = ''

    const copy = () => {
      navigator.clipboard.writeText(fullCode)
      copied.value = true

      clearTimeout(copyTimer)

      copyTimer = setTimeout(() => {
        copied.value = false
      }, 1000)
    }

    useEffect(() => {
      new Slot(() => {
        if (!ref.value) return

        const [, currentCode] = tabs[tab.value]
        fullCode = sharedCode ? `${sharedCode}${currentCode.trim()}` : currentCode.trim()

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
            <Button size='s' view='secondary' onclick={copy}>
              <IconCopy />
            </Button>
          </Flex>
        </Flex>
        <div class={styles.code}>
          <pre class={inject(lang, lang => `language-${lang}`)} ref={ref} />
        </div>
      </>
    )
  }

  return (
    <Flex<T> vertical {...(props as any)} class={styles.root}>
      <Content />
    </Flex>
  )
}
