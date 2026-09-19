import { useStyles } from '../../../hooks'
import { injectCSS } from '../../../utils'
import type { BlockProps, FlexElement } from '../../primitive'
import { Block, blockClasses } from '../../primitive'

export const fieldClasses = [
  ...blockClasses,
]

export const fieldStyles = injectCSS('rd_field', import.meta.env?.RD_THEME_FIELD, fieldClasses)

export type FieldStyles = typeof fieldStyles

export type FieldProps<T extends FlexElement = 'button', S extends FieldStyles = FieldStyles> = BlockProps<T, S>

export function Field<T extends keyof HTMLElementTagNameMap = 'label', S extends FieldStyles = FieldStyles> (
  props: FieldProps<T, S>,
) {
  const styles = useStyles(fieldStyles, props.class)

  return <Block element='label' {...props} class={styles} />
}
