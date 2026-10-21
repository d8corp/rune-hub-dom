import { classes } from 'html-classes'

import type { FlexElement, FlexProps } from '../Flex'
import { Flex } from '../Flex'

import { useStyles } from '../../../hooks'
import type { Merge, ObservableProp, RDColor, SMLSize } from '../../../types'
import { addCSS, inject, injectAll } from '../../../utils'

export type BoxSize = SMLSize | 'xs' | 'xxs' | 'xl' | 'xxl'
export type BoxView = 'filled' | 'bordered' | 'ghost' | 'dashed'
export type BoxInteract = 'hoverable' | 'clickable'

if (import.meta.env?.RD_THEME_BOX) {
  addCSS(import.meta.env.RD_THEME_BOX, 'box')
}

export const boxStyles = {
  root: import.meta.env?.RD_THEME_BOX__ROOT,
  primary: import.meta.env?.RD_THEME_BOX__PRIMARY,
  accent: import.meta.env?.RD_THEME_BOX__ACCENT,
  secondary: import.meta.env?.RD_THEME_BOX__SECONDARY,
  success: import.meta.env?.RD_THEME_BOX__SUCCESS,
  warning: import.meta.env?.RD_THEME_BOX__WARNING,
  danger: import.meta.env?.RD_THEME_BOX__DANGER,
  disabled: import.meta.env?.RD_THEME_BOX__DISABLED,
  square: import.meta.env?.RD_THEME_BOX__SQUARE,
  squareLeft: import.meta.env?.RD_THEME_BOX__SQUARE_LEFT,
  squareRight: import.meta.env?.RD_THEME_BOX__SQUARE_RIGHT,
  circle: import.meta.env?.RD_THEME_BOX__CIRCLE,
  clickable: import.meta.env?.RD_THEME_BOX__CLICKABLE,
  hoverable: import.meta.env?.RD_THEME_BOX__HOVERABLE,
  xxs: import.meta.env?.RD_THEME_BOX__XXS,
  xs: import.meta.env?.RD_THEME_BOX__XS,
  s: import.meta.env?.RD_THEME_BOX__S,
  m: import.meta.env?.RD_THEME_BOX__M,
  l: import.meta.env?.RD_THEME_BOX__L,
  xl: import.meta.env?.RD_THEME_BOX__XL,
  xxl: import.meta.env?.RD_THEME_BOX__XXL,
  filled: import.meta.env?.RD_THEME_BOX__FILLED,
  bordered: import.meta.env?.RD_THEME_BOX__BORDERED,
  ghost: import.meta.env?.RD_THEME_BOX__GHOST,
  dashed: import.meta.env?.RD_THEME_BOX__DASHED,
}

export type BoxStyles = typeof boxStyles

export type BoxProps<T extends FlexElement = 'div', S extends BoxStyles = BoxStyles> = Merge<FlexProps<T, S>, {
  color?: ObservableProp<RDColor>
  size?: ObservableProp<BoxSize>
  view?: ObservableProp<BoxView>
  square?: ObservableProp<boolean | 'left' | 'right'>
  circle?: ObservableProp<boolean>
  interact?: ObservableProp<BoxInteract | undefined>
}>

export function BoxComponent<T extends FlexElement = 'div', S extends BoxStyles = BoxStyles> ({
  size = 'm',
  color = 'primary',
  view = 'filled',
  square = false,
  circle = false,
  interact,
  ...props
}: BoxProps<T, S>) {
  const styles = useStyles(boxStyles, props.class)

  const root = injectAll([
    styles.root,
    inject(color, color => styles[color]),
    inject(view, view => styles[view]),
    inject(size, size => styles[size]),
    inject(interact, interact => interact && styles[interact]),
    inject(square, square => square === 'left' ? styles.squareLeft : square === 'right' ? styles.squareRight : square && styles.square),
    inject(circle, circle => circle && styles.circle),
  ], classes)

  return <Flex {...props as FlexProps<T, S>} class={root} />
}

export const Box = import.meta.env?.RD_UI_BOX
  ? import.meta.require?.(import.meta.env.RD_UI_BOX).Box as typeof BoxComponent
  : BoxComponent
