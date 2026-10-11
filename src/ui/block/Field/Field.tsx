import { useStyles } from '../../../hooks'
import type { Merge, ObservableProp, SMLSize } from '../../../types'
import { addCSS, inject } from '../../../utils'
import type { BoxProps, BoxSize, BoxStyles, FlexElement } from '../../primitive'
import { Box } from '../../primitive'

const transform = import.meta.env?.RD_THEME__TRANSFORM__FIELD &&
  import.meta.require?.(import.meta.env.RD_THEME__TRANSFORM__FIELD).default

if (import.meta.env?.RD_THEME_FIELD) {
  addCSS(import.meta.env.RD_THEME_FIELD, 'field')
}

export const fieldStyles = {
  root: import.meta.env?.RD_THEME_FIELD__ROOT,
  primary: import.meta.env?.RD_THEME_FIELD__PRIMARY,
  accent: import.meta.env?.RD_THEME_FIELD__ACCENT,
  secondary: import.meta.env?.RD_THEME_FIELD__SECONDARY,
  success: import.meta.env?.RD_THEME_FIELD__SUCCESS,
  warning: import.meta.env?.RD_THEME_FIELD__WARNING,
  danger: import.meta.env?.RD_THEME_FIELD__DANGER,
  disabled: import.meta.env?.RD_THEME_FIELD__DISABLED,
  square: import.meta.env?.RD_THEME_FIELD__SQUARE,
  squareLeft: import.meta.env?.RD_THEME_FIELD__SQUARE_LEFT,
  squareRight: import.meta.env?.RD_THEME_FIELD__SQUARE_RIGHT,
  circle: import.meta.env?.RD_THEME_FIELD__CIRCLE,
  m: import.meta.env?.RD_THEME_FIELD__M,
  s: import.meta.env?.RD_THEME_FIELD__S,
  l: import.meta.env?.RD_THEME_FIELD__L,
}

export const fieldSizeMap = {
  s: 'm',
  m: 'l',
  l: 'xl',
} as const satisfies Record<SMLSize, BoxSize>

export type FieldStyles = typeof fieldStyles

export type FieldProps<T extends FlexElement = 'label', S extends FieldStyles = FieldStyles> = Merge<BoxProps<T, S & BoxStyles>, {
  size?: ObservableProp<SMLSize>
}>

function FieldComponent<T extends keyof HTMLElementTagNameMap = 'label', S extends FieldStyles = FieldStyles> ({
  size = 'm',
  ...props
}: FieldProps<T, S>) {
  const styles = useStyles(fieldStyles, props.class)

  return (
    <Box
      element='label'
      {...(props as BoxProps<T, S & BoxStyles>)}
      size={inject(size, size => fieldSizeMap[size])}
      class={{ ...styles, m: styles.s, l: styles.m, xl: styles.l }}
    />
  )
}

export const Field = transform
  ? transform(FieldComponent) as typeof FieldComponent
  : FieldComponent
