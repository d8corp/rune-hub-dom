import { classes } from 'html-classes'

import { useStyles } from '../../../hooks'
import type { Merge, ObservableProp, RDColor, RDSize } from '../../../types'
import { addCSS, inject, injectAll } from '../../../utils'
import type { FlexElement, FlexProps } from '../../primitive'
import { Flex } from '../../primitive'

if (import.meta.env?.RD_THEME_DOT) {
  addCSS(import.meta.env.RD_THEME_DOT, 'dot')
}

export const dotStyles = {
  root: import.meta.env?.RD_THEME_DOT__ROOT,
  primary: import.meta.env?.RD_THEME_DOT__PRIMARY,
  accent: import.meta.env?.RD_THEME_DOT__ACCENT,
  secondary: import.meta.env?.RD_THEME_DOT__SECONDARY,
  success: import.meta.env?.RD_THEME_DOT__SUCCESS,
  warning: import.meta.env?.RD_THEME_DOT__WARNING,
  danger: import.meta.env?.RD_THEME_DOT__DANGER,
  disabled: import.meta.env?.RD_THEME_DOT__DISABLED,
  square: import.meta.env?.RD_THEME_DOT__SQUARE,
  m: import.meta.env?.RD_THEME_DOT__M,
  s: import.meta.env?.RD_THEME_DOT__S,
  l: import.meta.env?.RD_THEME_DOT__L,
  hoverable: import.meta.env?.RD_THEME_DOT__HOVERABLE,
  clickable: import.meta.env?.RD_THEME_DOT__CLICKABLE,
}

export type DotStyles = typeof dotStyles

export type DotProps<T extends FlexElement = 'span', S extends DotStyles = DotStyles> = Merge<FlexProps<T, S>, {
  size?: ObservableProp<RDSize>
  color?: ObservableProp<RDColor>
  hoverable?: ObservableProp<boolean>
  square?: ObservableProp<boolean>
  clickable?: ObservableProp<boolean>
}>

export function DotComponent<T extends FlexElement = 'span', S extends DotStyles = DotStyles> ({
  size = 'm',
  color = 'primary',
  square,
  clickable,
  hoverable,
  ...props
}: DotProps<T, S>) {
  const styles = useStyles(dotStyles, props.class)

  const classNames = injectAll([
    styles.root,
    inject(size, size => styles[size]),
    inject(color, color => styles[color]),
    inject(hoverable, hoverable => hoverable && styles.hoverable),
    inject(square, square => square && styles.square),
    inject(clickable, clickable => (clickable ?? Boolean(props.onclick)) && styles.clickable),
  ], classes)

  return (
    <Flex
      element='span'
      align='center'
      justify='center'
      {...props as FlexProps<T, S>}
      class={classNames}
    />
  )
}

export const Dot = import.meta.env?.RD_UI_DOT
  ? import.meta.require?.(import.meta.env.RD_UI_DOT).Dot as typeof DotComponent
  : DotComponent
