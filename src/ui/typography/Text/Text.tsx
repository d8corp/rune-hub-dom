import type { HTMLStyleProps } from '../../../hooks'
import { useStyles } from '../../../hooks'
import type { GlobalCSSValue, ObservableProp } from '../../../types'
import { addCSS, inject, injectAll } from '../../../utils'

export type TextAlign = 'left' | 'right' | 'center' | 'justify' | 'start' | 'end' | 'match-parent' | '-moz-center' | '-webkit-center' | GlobalCSSValue
export type TextDecoration = 'auto' | 'unset' | 'line-through' | 'overline' | 'underline' | GlobalCSSValue
export type TextBreak = 'normal' | 'break-all' | 'keep-all' | 'break-word' | 'auto-phrase' | GlobalCSSValue
export type TextWrap = 'wrap' | 'nowrap' | 'balance' | 'pretty' | 'stable' | GlobalCSSValue
export type TextWeight = 'bold' | 'normal' | 'lighter' | 'bolder' | GlobalCSSValue | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'

if (import.meta.env?.RD_THEME_TEXT) {
  addCSS(import.meta.env.RD_THEME_TEXT, 'text')
}

export const textStyles = {
  root: import.meta.env?.RD_THEME_TEXT__ROOT,
}

export type TextStyles = typeof textStyles

export interface TextProps extends HTMLStyleProps<HTMLSpanElement, TextStyles> {
  align?: ObservableProp<TextAlign | undefined>
  break?: ObservableProp<TextBreak | undefined>
  color?: ObservableProp<string | undefined>
  cursor?: ObservableProp<string | undefined>
  decoration?: ObservableProp<TextDecoration | undefined>
  italic?: ObservableProp<boolean | undefined>
  nowrap?: ObservableProp<boolean | number | undefined>
  size?: ObservableProp<number | string | undefined>
  weight?: ObservableProp<TextWeight | undefined>
  wrap?: ObservableProp<TextWrap | undefined>
}

function asIs<T> (value: T): T {
  return value
}

export function TextComponent ({
  color,
  cursor,
  weight,
  size,
  break: propsBreak,
  align,
  decoration,
  italic,
  nowrap,
  wrap,
  ...props
}: TextProps) {
  const styles = useStyles(textStyles, props.class)

  return (
    <span
      {...props}
      class={styles.root}
      style={{
        color: inject(color, asIs),
        cursor: inject(cursor, asIs),
        'font-weight': inject(weight, asIs),
        'word-break': inject(propsBreak, asIs),
        'text-align': inject(align, asIs),
        'text-decoration': inject(decoration, asIs),
        'text-wrap': inject(wrap, asIs),
        'font-size': inject(size, size => typeof size === 'number' ? `${size}px` : size),
        'font-style': inject(italic, italic => italic ? 'italic' : undefined),
        '-webkit-line-clamp': inject(nowrap, nowrap => typeof nowrap === 'number' ? String(nowrap) : nowrap ? '1' : undefined),
        display: inject(nowrap, nowrap => nowrap ? '-webkit-box' : undefined),
        '-webkit-box-orient': inject(nowrap, nowrap => nowrap ? 'vertical' : undefined),
        overflow: injectAll([nowrap, wrap], ([nowrap, wrap]) => nowrap || wrap === 'nowrap' ? 'hidden' : undefined),
        'text-overflow': inject(wrap, wrap => wrap === 'nowrap' ? 'ellipsis' : undefined),
        'white-space': inject(nowrap, nowrap => nowrap ? 'normal' : undefined),
        height: inject(nowrap, nowrap => nowrap ? 'fit-content' : undefined),
        ...props.style,
      }}
    />
  )
}

export const Text = import.meta.env?.RD_UI_TEXT
  ? import.meta.require?.(import.meta.env.RD_UI_TEXT).Text as typeof TextComponent
  : TextComponent
