import type { LinkProps } from '../Link'
import { Link } from '../Link'

import type { HTMLStyleProps } from '../../../hooks'
import { useStyles } from '../../../hooks'
import type { ObservableProp } from '../../../types'
import { inject, injectAll, injectCSS } from '../../../utils'

const flexStyles = injectCSS('rd_flex', `
.rd_flex {
  --rd-flex: flex;
  --rd-flex-flex: none;
  --rd-flex-gap: none;
  --rd-flex-wrap: nowrap;
  --rd-flex-direction: row;
  --rd-flex-align: none;
  --rd-flex-justify: unset;
  --rd-flex-padding: 0;

  box-sizing: border-box;
  display: var(--rd-flex);
  flex: var(--rd-flex-flex);
  gap: var(--rd-flex-gap);
  flex-wrap: var(--rd-flex-wrap);
  flex-direction: var(--rd-flex-direction);
  align-items: var(--rd-flex-align);
  justify-content: var(--rd-flex-justify);
  padding: var(--rd-flex-padding);
}
`, [])

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
