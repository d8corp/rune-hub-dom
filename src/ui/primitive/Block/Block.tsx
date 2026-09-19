import { classes } from 'html-classes'

import type { FlexElement, FlexProps } from '../Flex'
import { Flex } from '../Flex'

import { useStyles } from '../../../hooks'
import type { Merge, ObservableProp, RDColor, RDSize } from '../../../types'
import { addCSS, inject, injectAll } from '../../../utils'

if (import.meta.env?.RD_THEME_BLOCK) {
  addCSS(import.meta.env.RD_THEME_BLOCK, 'block')
}

export const blockStyles = {
  root: import.meta.env?.RD_THEME_BLOCK__ROOT,
  primary: import.meta.env?.RD_THEME_BLOCK__PRIMARY,
  accent: import.meta.env?.RD_THEME_BLOCK__ACCENT,
  secondary: import.meta.env?.RD_THEME_BLOCK__SECONDARY,
  success: import.meta.env?.RD_THEME_BLOCK__SUCCESS,
  warning: import.meta.env?.RD_THEME_BLOCK__WARNING,
  danger: import.meta.env?.RD_THEME_BLOCK__DANGER,
  disabled: import.meta.env?.RD_THEME_BLOCK__DISABLED,
  square: import.meta.env?.RD_THEME_BLOCK__SQUARE,
  circle: import.meta.env?.RD_THEME_BLOCK__CIRCLE,
  m: import.meta.env?.RD_THEME_BLOCK__M,
  s: import.meta.env?.RD_THEME_BLOCK__S,
  l: import.meta.env?.RD_THEME_BLOCK__L,
}

export type BlockStyles = typeof blockStyles

export type BlockProps<T extends FlexElement = 'div', S extends BlockStyles = BlockStyles> = Merge<FlexProps<T, S>, {
  color?: ObservableProp<RDColor>
  size?: ObservableProp<RDSize>
  disabled?: ObservableProp<boolean>
  square?: ObservableProp<boolean>
  circle?: ObservableProp<boolean>
}>

export function Block<T extends keyof HTMLElementTagNameMap = 'div', S extends BlockStyles = BlockStyles> ({
  size = 'm',
  color = 'secondary',
  disabled = false,
  square = false,
  circle = false,
  ...props
}: BlockProps<T, S>) {
  const styles = useStyles(blockStyles, props.class)

  const root = injectAll([
    styles.root,
    inject(color, view => styles[view]),
    inject(size, size => styles[size]),
    inject(square, square => square && styles.square),
    inject(circle, circle => circle && styles.circle),
  ], classes)

  return (
    <Flex
      {...props as FlexProps<T, S>}
      disabled={inject(disabled, disabled => disabled || undefined)}
      class={root}
    />
  )
}
