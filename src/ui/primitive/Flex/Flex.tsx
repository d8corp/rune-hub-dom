import type { BaseLinkProps } from '../Link'
import { Link } from '../Link'

import type { HTMLStyleProps } from '../../../hooks'
import { useStyles } from '../../../hooks'
import type {
  GlobalCSSValue,
  HTMLElementTagName,
  Merge,
  ObservableProp,
} from '../../../types'
import { addCSS, inject, injectAll, injectAsIs, type LinkToParams } from '../../../utils'

if (import.meta.env?.RD_THEME_FLEX) {
  addCSS(import.meta.env.RD_THEME_FLEX, 'flex')
}

const flexStyles = {
  root: import.meta.env?.RD_THEME_FLEX__ROOT,
}

export type FlexStyles = typeof flexStyles
export type FlexElement = HTMLElementTagName
export type FlexPadding = number | [number, number] | [number, number, number] | [number, number, number, number]
export type FlexGap = number | [number, number]
export type FlexBaseAlign = 'normal' | 'stretch' | 'center' | 'start' | 'end' | 'flex-start' | 'flex-end' | 'safe center' | 'unsafe center' | GlobalCSSValue
export type FlexJustify = 'space-between' | 'space-around' | 'space-evenly' | FlexBaseAlign
export type FlexAlign = 'self-start' | 'self-end' | 'anchor-center' | 'baseline' | 'first baseline' | 'last baseline' | FlexBaseAlign

export interface BaseFlexProps {
  align?: ObservableProp<FlexAlign | undefined>
  flex?: ObservableProp<number | boolean | undefined>
  gap?: ObservableProp<FlexGap | undefined>
  inline?: ObservableProp<boolean | undefined>
  justify?: ObservableProp<FlexJustify | undefined>
  padding?: ObservableProp<FlexPadding | undefined>
  reverse?: ObservableProp<boolean | undefined>
  vertical?: ObservableProp<boolean | undefined>
  wrap?: ObservableProp<boolean | undefined>
}

export type FlexProps<T extends FlexElement = 'div', S extends FlexStyles = FlexStyles> = Merge<
  T extends 'a' ? Merge<HTMLStyleProps<'a', S>, LinkToParams & BaseLinkProps> : HTMLStyleProps<T, S>,
  { element?: T } & BaseFlexProps
>

export function FlexComponent<T extends FlexElement = 'div', S extends FlexStyles = FlexStyles> ({
  align,
  flex,
  gap,
  inline,
  justify,
  padding,
  reverse,
  vertical,
  wrap,
  style,
  element = 'div' as T,
  ...props
}: FlexProps<T, S>) {
  const styles = useStyles(flexStyles, props.class)
  const Element = element === 'a' ? Link as any : element as string

  return (
    <Element
      {...props}
      class={styles.root}
      style={{
        'justify-content': injectAsIs(justify),
        'align-items': injectAsIs(align),
        'flex-wrap': inject(wrap, wrap => wrap ? 'wrap' : undefined),
        flex: inject(flex, flex => String(flex === true ? 1 : flex || undefined)),
        display: inject(inline, inline => inline ? 'inline-flex' : undefined),
        'flex-direction': injectAll([vertical, reverse], ([vertical, reverse]) => vertical ? (reverse ? 'column-reverse' : 'column') : reverse ? 'row-reverse' : ''),
        padding: inject(padding, padding => padding === undefined ? undefined : Array.isArray(padding) ? `${padding.join('px ')}px` : `${padding}px`),
        gap: inject(gap, gap => gap === undefined ? undefined : Array.isArray(gap) ? `${gap[0]}px ${gap[1]}px` : `${gap}px`),
        ...style,
      }}
    />
  )
}

export const Flex = import.meta.env?.RD_UI_FLEX
  ? import.meta.require?.(import.meta.env.RD_UI_FLEX).Flex as typeof FlexComponent
  : FlexComponent
