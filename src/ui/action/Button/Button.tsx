import { useStyles } from '../../../hooks'
import type { BlockProps, FlexElement } from '../../layout'
import { Block } from '../../layout'
import $styles from './Button.module.scss'

export type ButtonStyles = typeof $styles

export type ButtonProps<T extends FlexElement = 'button', S extends ButtonStyles = ButtonStyles> = BlockProps<T, S>

export function Button<T extends keyof HTMLElementTagNameMap = 'button', S extends ButtonStyles = ButtonStyles> (
  props: ButtonProps<T, S>,
) {
  const styles = useStyles($styles, props.class)

  return (
    <Block
      inline
      justify='center'
      align='center'
      element='button'
      {...props as BlockProps<T, S>}
      class={styles}
    />
  )
}
