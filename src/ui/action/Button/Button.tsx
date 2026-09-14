import { classes } from 'html-classes'

import { useStyles } from '../../../hooks'
import type { Merge, ObservableProp, RDColor, RDSize } from '../../../types'
import { inject, injectAll } from '../../../utils'
import type { FlexElement, FlexProps } from '../../layout'
import { Flex } from '../../layout'
import $styles from './Button.module.scss'

export type ButtonStyles = typeof $styles

export type ButtonProps<T extends FlexElement = 'button', S extends ButtonStyles = ButtonStyles> = Merge<FlexProps<T, S>, {
  color?: ObservableProp<RDColor>
  size?: ObservableProp<RDSize>
  disabled?: ObservableProp<boolean>
}>

export function Button<T extends keyof HTMLElementTagNameMap = 'button', S extends ButtonStyles = ButtonStyles> ({
  size = 'm',
  color = 'secondary',
  disabled = false,
  ...props
}: ButtonProps<T, S>) {
  const styles = useStyles($styles, props.class)

  const root = injectAll([
    styles.root,
    inject(color, view => styles[view]),
    inject(size, size => styles[size]),
  ], classes)

  return (
    <Flex
      inline
      justify='center'
      align='center'
      element='button'
      disabled={inject(disabled, disabled => disabled || undefined)}
      {...props as FlexProps<T, S>}
      class={root}
    />
  )
}
