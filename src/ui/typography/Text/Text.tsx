import type { HTMLProps, ObservableProp } from '../../../types'
import { inject } from '../../../utils'

export type TextAlign = 'left' | 'right' | 'center' | 'justify'
export type TextDecoration = 'auto' | 'unset' | 'line-through' | 'overline' | 'underline'
export type TextBreak = 'normal' | 'break-all' | 'keep-all' | 'break-word'
export type TextWeight = 'bold' | 'normal' | 'lighter' | 'bolder' | 'inherit' | 'initial' | 'unset' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'

export interface TextProps extends HTMLProps<HTMLSpanElement> {
  color?: ObservableProp<string>;
  size?: ObservableProp<number | string>;
  cursor?: ObservableProp<string>;
  weight?: ObservableProp<TextWeight>;
  decoration?: ObservableProp<TextDecoration>;
  italic?: ObservableProp<boolean>;
  nowrap?: ObservableProp<boolean | number>;
  align?: ObservableProp<TextAlign>;
  break?: ObservableProp<TextBreak>;
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
        'font-size': inject(size, size => typeof size === 'number' ? `${size}px` : size),
        'font-style': inject(italic, italic => italic ? 'italic' : undefined),
        '-webkit-line-clamp': inject(nowrap, nowrap => typeof nowrap === 'number' ? String(nowrap) : nowrap ? '1' : undefined),
        ...props.style,
      }}
    />
  )
}
