import type { LinkProps } from '../Link'
import { Link } from '../Link'

import type { HTMLStyleProps } from '../../../hooks'
import { useStyles } from '../../../hooks'
import type { HTMLStyleProp, ObservableProp } from '../../../types'
import { addCSS, inject, injectAll } from '../../../utils'

if (import.meta.env?.RD_THEME_FLEX) {
  addCSS(import.meta.env.RD_THEME_FLEX, 'flex')
}

const flexStyles = {
  root: import.meta.env?.RD_THEME_FLEX__ROOT,
}

export type FlexStyles = typeof flexStyles

export const alignJustifyMap = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  stretch: 'stretch',
} as const

export const alignMap = {
  ...alignJustifyMap,
  baseline: 'baseline',
} as const

export const justifyMap = {
  ...alignMap,
  between: 'space-between',
  around: 'space-around',
} as const

export type FlexElement = keyof HTMLElementTagNameMap

export interface BaseFlexProps {
  vertical?: ObservableProp<boolean>
  align?: ObservableProp<keyof typeof alignMap>
  justify?: ObservableProp<keyof typeof justifyMap>
  gap?: ObservableProp<number | [number, number]>
  flex?: ObservableProp<number | boolean>
  wrap?: ObservableProp<boolean>
  inline?: ObservableProp<boolean>
  reverse?: ObservableProp<boolean>
  padding?: ObservableProp<number | [number, number] | [number, number, number] | [number, number, number, number]>
}

export type FlexProps<T extends FlexElement = 'div', S extends FlexStyles = FlexStyles> = HTMLStyleProps<HTMLElementTagNameMap[T], S> & {
  element?: T
  style?: HTMLStyleProp
} & BaseFlexProps & (T extends 'a' ? LinkProps : object)

export function Flex<T extends FlexElement = 'div', S extends FlexStyles = FlexStyles> ({
  vertical,
  align,
  justify,
  gap,
  flex,
  wrap,
  inline,
  reverse,
  style,
  padding,
  element = 'div' as T,
  ...props
}: FlexProps<T, S>) {
  const styles = useStyles(flexStyles, props.class)
  const Element = element === 'a' ? Link as any : element as string

  return (
    <Element
      {...props as any}
      class={styles.root}
      style={{
        'justify-content': inject(justify, justify => justify && justify !== 'start' ? justifyMap[justify] : ''),
        'align-items': inject(align, align => align && align !== 'start' ? alignMap[align as keyof typeof alignMap] : ''),
        'flex-wrap': inject(wrap, wrap => wrap ? 'wrap' : ''),
        flex: inject(flex, flex => String(flex === true ? 1 : flex || '')),
        display: inject(inline, inline => inline ? 'inline-flex' : ''),
        'flex-direction': injectAll([vertical, reverse], ([vertical, reverse]) => vertical ? (reverse ? 'column-reverse' : 'column') : reverse ? 'row-reverse' : ''),
        padding: inject(padding, padding => !padding ? '' : Array.isArray(padding) ? `${padding.join('px ')}px` : `${padding}px`),
        gap: inject(gap, gap => !gap ? '' : Array.isArray(gap) ? `${gap[0]}px ${gap[1]}px` : `${gap}px`),
        ...(style as any),
      }}
    />
  )
}
