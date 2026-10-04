import type { HTMLProps, ObservableProp } from '../../../types'
import { inject } from '../../../utils'

export type BaseTextStyleValue = 'inherit' | 'initial' | 'revert' | 'revert-layer' | 'unset'
export type TextAlign = 'left' | 'right' | 'center' | 'justify' | 'start' | 'end' | 'match-parent' | '-moz-center' | '-webkit-center' | BaseTextStyleValue
export type TextDecoration = 'auto' | 'unset' | 'line-through' | 'overline' | 'underline' | BaseTextStyleValue
export type TextBreak = 'normal' | 'break-all' | 'keep-all' | 'break-word' | 'auto-phrase' | BaseTextStyleValue
export type TextWrap = 'wrap' | 'nowrap' | 'balance' | 'pretty' | 'stable' | BaseTextStyleValue
export type TextWeight = 'bold' | 'normal' | 'lighter' | 'bolder' | BaseTextStyleValue | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'

export interface TextProps extends HTMLProps<HTMLSpanElement> {
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

export function Text ({
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
  return (
    <span
      {...props}
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
        overflow: inject(nowrap, nowrap => nowrap ? 'hidden' : undefined),
        'white-space': inject(nowrap, nowrap => nowrap ? 'normal' : undefined),
        height: inject(nowrap, nowrap => nowrap ? 'fit-content' : undefined),
        ...props.style,
      }}
    />
  )
}
