import { useStyles } from '../../../hooks'
import { addCSS } from '../../../utils'
import type { BlockProps, FlexElement } from '../../primitive'
import { Block } from '../../primitive'

if (import.meta.env?.RD_THEME_BUTTON) {
  addCSS(import.meta.env.RD_THEME_BUTTON, 'button')
}

export const buttonStyles = {
  root: import.meta.env?.RD_THEME_BUTTON__ROOT,
  primary: import.meta.env?.RD_THEME_BUTTON__PRIMARY,
  accent: import.meta.env?.RD_THEME_BUTTON__ACCENT,
  secondary: import.meta.env?.RD_THEME_BUTTON__SECONDARY,
  success: import.meta.env?.RD_THEME_BUTTON__SUCCESS,
  warning: import.meta.env?.RD_THEME_BUTTON__WARNING,
  danger: import.meta.env?.RD_THEME_BUTTON__DANGER,
  disabled: import.meta.env?.RD_THEME_BUTTON__DISABLED,
  square: import.meta.env?.RD_THEME_BUTTON__SQUARE,
  circle: import.meta.env?.RD_THEME_BUTTON__CIRCLE,
  m: import.meta.env?.RD_THEME_BUTTON__M,
  s: import.meta.env?.RD_THEME_BUTTON__S,
  l: import.meta.env?.RD_THEME_BUTTON__L,
}

export type ButtonStyles = typeof buttonStyles

export type ButtonProps<T extends FlexElement = 'button', S extends ButtonStyles = ButtonStyles> = BlockProps<T, S>

export function Button<T extends keyof HTMLElementTagNameMap = 'button', S extends ButtonStyles = ButtonStyles> (
  props: ButtonProps<T, S>,
) {
  const styles = useStyles(buttonStyles, props.class)

  return <Block element='button' {...props} class={styles} />
}
