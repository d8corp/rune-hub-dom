import { classes } from 'html-classes'

import type { HTMLStyleProps } from '../../../hooks'
import { useStyles } from '../../../hooks'
import type { GlobalCSSValue, ObservableProp, RDColor, XSMLSize } from '../../../types'
import { addUiCSS, inject, injectAll, injectAsIs } from '../../../utils'

export type TextAlign = 'left' | 'right' | 'center' | 'justify' | 'start' | 'end' | 'match-parent' | '-moz-center' | '-webkit-center' | GlobalCSSValue
export type TextDecoration = 'auto' | 'unset' | 'line-through' | 'overline' | 'underline' | GlobalCSSValue
export type TextBreak = 'normal' | 'break-all' | 'keep-all' | 'break-word' | 'auto-phrase' | GlobalCSSValue
export type TextWrap = 'wrap' | 'nowrap' | 'balance' | 'pretty' | 'stable' | GlobalCSSValue
export type TextWeight = 'bold' | 'normal' | 'lighter' | 'bolder' | GlobalCSSValue | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
export type TextBoxTrim = 'none' | 'trim-start' | 'trim-end' | 'trim-both' | GlobalCSSValue
export type TextBoxEdgeStart = 'text' | 'cap' | 'ex'
export type TextBoxEdgeEnd = 'text' | 'alphabetic'
export type TextTransform = 'none' | 'capitalize' | 'uppercase' | 'lowercase' | 'math-auto' | GlobalCSSValue
export type TextBoxEdge = 'auto' | 'text' | `${TextBoxEdgeStart} ${TextBoxEdgeEnd}` | GlobalCSSValue
export type TextBox = `${TextBoxTrim} ${TextBoxEdge}` | TextBoxEdge | TextBoxTrim
export type TextColor = RDColor | 'text' | 'muted' | 'dim'
export type TextSize = XSMLSize

if (import.meta.env?.RD_THEME_TEXT) {
  addUiCSS(import.meta.env.RD_THEME_TEXT, 'text')
}

export const textStyles = {
  root: import.meta.env?.RD_THEME_TEXT__ROOT,
  primary: import.meta.env?.RD_THEME_TEXT__PRIMARY,
  accent: import.meta.env?.RD_THEME_TEXT__ACCENT,
  secondary: import.meta.env?.RD_THEME_TEXT__SECONDARY,
  success: import.meta.env?.RD_THEME_TEXT__SUCCESS,
  warning: import.meta.env?.RD_THEME_TEXT__WARNING,
  danger: import.meta.env?.RD_THEME_TEXT__DANGER,
  disabled: import.meta.env?.RD_THEME_TEXT__DISABLED,
  text: import.meta.env?.RD_THEME_TEXT__TEXT,
  muted: import.meta.env?.RD_THEME_TEXT__MUTED,
  dim: import.meta.env?.RD_THEME_TEXT__DIM,
  xxs: import.meta.env?.RD_THEME_TEXT__XXS,
  xs: import.meta.env?.RD_THEME_TEXT__XS,
  s: import.meta.env?.RD_THEME_TEXT__S,
  m: import.meta.env?.RD_THEME_TEXT__M,
  l: import.meta.env?.RD_THEME_TEXT__L,
  xl: import.meta.env?.RD_THEME_TEXT__XL,
  xxl: import.meta.env?.RD_THEME_TEXT__XXL,
}

export type TextStyles = typeof textStyles

export interface TextProps extends HTMLStyleProps<'span', TextStyles> {
  align?: ObservableProp<TextAlign | undefined>
  break?: ObservableProp<TextBreak | undefined>
  color?: ObservableProp<TextColor | undefined>
  cursor?: ObservableProp<string | undefined>
  decoration?: ObservableProp<TextDecoration | undefined>
  italic?: ObservableProp<boolean | undefined>
  nowrap?: ObservableProp<boolean | number | undefined>
  size?: ObservableProp<TextSize | undefined>
  lineHeight?: ObservableProp<number | string | undefined>
  weight?: ObservableProp<TextWeight | undefined>
  wrap?: ObservableProp<TextWrap | undefined>
  box?: ObservableProp<TextBox | undefined>
  transform?: ObservableProp<TextTransform | undefined>
}

export function TextComponent ({
  color,
  cursor,
  weight,
  size,
  break: propsBreak,
  align,
  decoration,
  lineHeight,
  italic,
  nowrap,
  wrap,
  box,
  transform,
  ...props
}: TextProps) {
  const styles = useStyles(textStyles, props.class)

  const root = injectAll([
    styles.root,
    inject(color, color => color && styles[color]),
    inject(size, size => size && styles[size]),
  ], classes)

  return (
    <span
      {...props}
      class={root}
      style={{
        cursor: injectAsIs(cursor),
        'font-weight': injectAsIs(weight),
        'word-break': injectAsIs(propsBreak),
        'text-align': injectAsIs(align),
        'text-decoration': injectAsIs(decoration),
        'text-wrap': injectAsIs(wrap),
        'text-box': injectAsIs(box),
        'text-transform': injectAsIs(transform),
        'line-height': inject(lineHeight, lineHeight => typeof lineHeight === 'number' ? `${lineHeight}px` : lineHeight),
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
