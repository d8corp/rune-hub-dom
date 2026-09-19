import { classes } from 'html-classes'
import { Slot } from 'rune-hub'

import type { HTMLStyleProps } from '../../../hooks'
import { useStyles } from '../../../hooks'
import { addCSS } from '../../../utils'

if (import.meta.env?.RD_THEME_CODE) {
  addCSS(import.meta.env.RD_THEME_CODE, 'code')
}

export const codeStyles = {
  root: import.meta.env?.RD_THEME_CODE__ROOT,
  copied: import.meta.env?.RD_THEME_CODE__COPIED,
}

export type CodeStyles = typeof codeStyles

export interface CodeProps extends HTMLStyleProps<HTMLElement, CodeStyles> {}

export function Code ({ onclick, style, ...props }: CodeProps) {
  const styles = useStyles(codeStyles, props.class)
  const x = new Slot(function x () { return '' })
  const y = new Slot(function y () { return '' })
  const copied = new Slot(function copied () { return false })
  let copyTimer: any

  const handleClick = (e: PointerEvent) => {
    navigator.clipboard.writeText((e.target as HTMLDivElement).innerText)
    x.set(e.clientX + 'px')
    y.set(e.clientY + 'px')
    copied.value = true

    clearTimeout(copyTimer)

    copyTimer = setTimeout(() => {
      copied.value = false
    }, 1000)

    // @ts-expect-error: this
    onclick?.(e)
  }

  const root = () => classes([
    styles.root,
    copied.value && styles.copied,
  ])

  return (
    <code
      {...props}
      style={{
        ...style,
        '--ui-code-x': x,
        '--ui-code-y': y,
      }}
      class={root}
      onclick={handleClick}
    />
  )
}
