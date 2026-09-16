import { useStyles } from '../../../hooks'
import { injectCSS } from '../../../utils'
import type { BlockProps, FlexElement } from '../../primitive'
import { Block } from '../../primitive'

export const buttonStyles = injectCSS('rd_button', import.meta.env?.RD_THEME_BUTTON, [
  'primary',
  'accent',
  'secondary',
  'success',
  'warning',
  'danger',
  'disabled',
  'square',
  'circle',
  'm',
  's',
  'l',
])

export type ButtonStyles = typeof buttonStyles

export type ButtonProps<T extends FlexElement = 'button', S extends ButtonStyles = ButtonStyles> = BlockProps<T, S>

export function Button<T extends keyof HTMLElementTagNameMap = 'button', S extends ButtonStyles = ButtonStyles> (
  props: ButtonProps<T, S>,
) {
  const styles = useStyles(buttonStyles, props.class)

  return (
    <Block
      inline
      justify='center'
      align='center'
      element='button'
      {...props}
      class={styles}
    />
  )
}
