import { useStyles } from '../../../hooks'
import { injectCSS } from '../../../utils'
import type { BlockProps, FlexElement } from '../../primitive'
import { Block, blockClasses } from '../../primitive'

export const buttonClasses = [
  ...blockClasses,
] as const satisfies string[]

export const buttonStyles = injectCSS('rd_button', import.meta.env?.RD_THEME_BUTTON, buttonClasses)

export type ButtonStyles = typeof buttonStyles

export type ButtonProps<T extends FlexElement = 'button', S extends ButtonStyles = ButtonStyles> = BlockProps<T, S>

export function Button<T extends keyof HTMLElementTagNameMap = 'button', S extends ButtonStyles = ButtonStyles> (
  props: ButtonProps<T, S>,
) {
  const styles = useStyles(buttonStyles, props.class)

  return <Block element='button' {...props} class={styles} />
}
