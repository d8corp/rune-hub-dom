import { classes } from 'html-classes'

import { useStyles } from '../../../hooks'
import type { GlobalCSSValue, HTMLStyleProp, Merge, ObservableProp, RDSize } from '../../../types'
import { addCSS, inject, injectAll } from '../../../utils'
import type { FlexElement, FlexProps } from '../../primitive'
import { Flex } from '../../primitive'

if (import.meta.env?.RD_THEME_SCROLLBAR) {
  addCSS(import.meta.env.RD_THEME_SCROLLBAR, 'scrollbar')
}

export const scrollbarStyles = {
  root: import.meta.env?.RD_THEME_SCROLLBAR__ROOT,
  stable: import.meta.env?.RD_THEME_SCROLLBAR__STABLE,
  m: import.meta.env?.RD_THEME_SCROLLBAR__M,
  s: import.meta.env?.RD_THEME_SCROLLBAR__S,
  l: import.meta.env?.RD_THEME_SCROLLBAR__L,
}

export type ScrollbarStyles = typeof scrollbarStyles

export type ScrollbarOverflowBase = 'auto' | 'hidden' | 'scroll' | 'visible' | 'clip' | GlobalCSSValue
export type ScrollbarOverflow = ScrollbarOverflowBase | `${ScrollbarOverflowBase} ${ScrollbarOverflowBase}`

export type ScrollbarProps<T extends FlexElement = 'div', S extends ScrollbarStyles = ScrollbarStyles> = Merge<FlexProps<T, S>, {
  stable?: ObservableProp<boolean>
  overflow?: ObservableProp<ScrollbarOverflow>
  size?: ObservableProp<RDSize>
}>

export function ScrollbarComponent<T extends keyof HTMLElementTagNameMap = 'div', S extends ScrollbarStyles = ScrollbarStyles> ({
  stable,
  size = 'm',
  overflow = 'auto',
  ...props
}: ScrollbarProps<T, S>) {
  const styles = useStyles(scrollbarStyles, props.class)

  const root = injectAll([
    styles.root,
    inject(size, size => size && styles[size]),
    inject(stable, stable => stable && styles.stable),
  ], classes)

  return (
    <Flex
      {...props as FlexProps<T, S>}
      style={{
        ...(props.style as HTMLStyleProp),
        overflow,
      }}
      class={root}
    />
  )
}

export const Scrollbar = import.meta.env?.RD_UI_SCROLLBAR
  ? import.meta.require?.(import.meta.env.RD_UI_SCROLLBAR).Scrollbar as typeof ScrollbarComponent
  : ScrollbarComponent
