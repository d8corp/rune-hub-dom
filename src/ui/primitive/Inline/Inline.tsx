import { classes } from 'html-classes'

import type { FlexElement, FlexProps } from '../Flex'
import { Flex } from '../Flex'

import { useStyles } from '../../../hooks'
import type { Merge, ObservableProp, RDColor, RDSize } from '../../../types'
import { addCSS, inject, injectAll } from '../../../utils'

if (import.meta.env?.RD_THEME_INLINE) {
  addCSS(import.meta.env.RD_THEME_INLINE, 'inline')
}

export const inlineStyles = {
  root: import.meta.env?.RD_THEME_INLINE__ROOT,
  primary: import.meta.env?.RD_THEME_INLINE__PRIMARY,
  accent: import.meta.env?.RD_THEME_INLINE__ACCENT,
  secondary: import.meta.env?.RD_THEME_INLINE__SECONDARY,
  success: import.meta.env?.RD_THEME_INLINE__SUCCESS,
  warning: import.meta.env?.RD_THEME_INLINE__WARNING,
  danger: import.meta.env?.RD_THEME_INLINE__DANGER,
  disabled: import.meta.env?.RD_THEME_INLINE__DISABLED,
  square: import.meta.env?.RD_THEME_INLINE__SQUARE,
  m: import.meta.env?.RD_THEME_INLINE__M,
  s: import.meta.env?.RD_THEME_INLINE__S,
  l: import.meta.env?.RD_THEME_INLINE__L,
  hoverable: import.meta.env?.RD_THEME_INLINE__HOVERABLE,
  clickable: import.meta.env?.RD_THEME_INLINE__CLICKABLE,
}

export type InlineStyles = typeof inlineStyles

export type InlineProps<T extends FlexElement = 'span', S extends InlineStyles = InlineStyles> = Merge<FlexProps<T, S>, {
  size?: ObservableProp<RDSize>
  color?: ObservableProp<RDColor>
  pulse?: ObservableProp<boolean>
  hoverable?: ObservableProp<boolean>
  square?: ObservableProp<boolean>
}>

export function Inline<T extends FlexElement = 'span', S extends InlineStyles = InlineStyles> ({
  size = 'm',
  color = 'warning',
  hoverable,
  square,
  ...props
}: InlineProps<T, S>) {
  const styles = useStyles(inlineStyles, props.class)

  return (
    <Flex
      element='span'
      {...props as FlexProps<T, S>}
      class={injectAll([
        styles.root,
        props.onclick && styles.clickable,
        inject(size, size => styles[size]),
        inject(color, color => styles[color]),
        inject(hoverable, hoverable => hoverable && styles.hoverable),
        inject(square, square => square && styles.square),
      ], classes)}
    />
  )
}
