import { Link } from '../Link'

import type { LinkProps } from '../../../components'
import type { HTMLStyleProps } from '../../../hooks'
import { useStyles } from '../../../hooks'
import type { ObservableProp } from '../../../types'
import { inject, injectAll } from '../../../utils'
import $styles from './Flex.module.scss'

export type FlexStyles = typeof $styles

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
  const styles = useStyles($styles, props.class)
  const Element = element === 'a' ? Link as any : element as string

  return (
    <Element
      {...props as any}
      class={styles.root}
      style={{
        ...(style as any),
        '--rd-flex-justify': inject(justify, justify => justify && justify !== 'start' ? justifyMap[justify] : ''),
        '--rd-flex-align': inject(align, align => align && align !== 'start' ? alignMap[align as keyof typeof alignMap] : ''),
        '--rd-flex-wrap': inject(wrap, wrap => wrap ? 'wrap' : ''),
        '--rd-flex-flex': inject(flex, flex => String(flex === true ? 1 : flex || '')),
        '--rd-flex': inject(inline, inline => inline ? 'inline-flex' : ''),
        '--rd-flex-direction': injectAll([vertical, reverse], ([vertical, reverse]) => vertical ? (reverse ? 'column-reverse' : 'column') : reverse ? 'row-reverse' : ''),
        '--rd-flex-padding': inject(padding, padding => !padding ? '' : Array.isArray(padding) ? `${padding.join('px ')}px` : `${padding}px`),
        '--rd-flex-gap': inject(gap, gap => !gap ? '' : Array.isArray(gap) ? `${gap[0]}px ${gap[1]}px` : `${gap}px`),
      }}
    />
  )
}
