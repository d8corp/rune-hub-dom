import { useStyles } from '../../../hooks'
import type { JSXElement, Merge, ObservableProp, SMLSize } from '../../../types'
import { addUiCSS, inject } from '../../../utils'
import type { BoxProps, BoxSize, BoxStyles, FlexElement } from '../../primitive'
import { Box } from '../../primitive'

if (import.meta.env?.RD_THEME_FIELD) {
  addUiCSS(import.meta.env.RD_THEME_FIELD, 'field')
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
  label: import.meta.env?.RD_THEME_FIELD__LABEL,
  content: import.meta.env?.RD_THEME_FIELD__CONTENT,
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
  label?: ObservableProp<string>
  before?: JSXElement
  after?: JSXElement
}>

function FieldComponent<T extends keyof HTMLElementTagNameMap = 'label', S extends FieldStyles = FieldStyles> ({
  size = 'm',
  children,
  label,
  before,
  after,
  ...props
}: FieldProps<T, S>) {
  const styles = useStyles(fieldStyles, props.class)

  return (
    <Box
      element='label'
      {...(props as BoxProps<T, S & BoxStyles>)}
      size={inject(size, size => fieldSizeMap[size])}
      class={{ ...styles, m: styles.s, l: styles.m, xl: styles.l }}
    >
      {before}
      <span class={styles.content}>
        {children}
        {inject(label, label => label
          ? <span class={styles.label}>{label}</span>
          : null,
        )}
      </span>
      {after}
    </Box>
  )
}

export const Field = import.meta.env?.RD_UI_FIELD
  ? import.meta.require?.(import.meta.env.RD_UI_FIELD).Field as typeof FieldComponent
  : FieldComponent
