import { useStyles } from '../../../hooks'
import { addCSS } from '../../../utils'
import type { BlockProps, BlockStyles, FlexElement } from '../../primitive'
import { Block } from '../../primitive'

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
  circle: import.meta.env?.RD_THEME_FIELD__CIRCLE,
  m: import.meta.env?.RD_THEME_FIELD__M,
  s: import.meta.env?.RD_THEME_FIELD__S,
  l: import.meta.env?.RD_THEME_FIELD__L,
} satisfies BlockStyles

export type FieldStyles = typeof fieldStyles

export type FieldProps<T extends FlexElement = 'label', S extends FieldStyles = FieldStyles> = BlockProps<T, S>

function FieldComponent<T extends keyof HTMLElementTagNameMap = 'label', S extends FieldStyles = FieldStyles> (
  props: FieldProps<T, S>,
) {
  const styles = useStyles(fieldStyles, props.class)

  return <Block element='label' {...props} class={styles} />
}

export const Field = transform
  ? transform(FieldComponent) as typeof FieldComponent
  : FieldComponent
