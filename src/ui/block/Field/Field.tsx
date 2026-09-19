import { useStyles } from '../../../hooks'
import { injectCSS } from '../../../utils'
import type { BlockProps, FlexElement } from '../../primitive'
import { Block, blockClasses } from '../../primitive'

export const fieldClasses = [
  ...blockClasses,
] as const satisfies string[]

export const fieldStyles = injectCSS('field', import.meta.env?.RD_THEME_FIELD, fieldClasses)

export type FieldStyles = typeof fieldStyles

export type FieldProps<T extends FlexElement = 'label', S extends FieldStyles = FieldStyles> = BlockProps<T, S>

export function Field<T extends keyof HTMLElementTagNameMap = 'label', S extends FieldStyles = FieldStyles> (
  props: FieldProps<T, S>,
) {
  const styles = useStyles(fieldStyles, props.class)

  return <Block element='label' {...props} class={styles} />
}
