import { classes } from 'html-classes'

import { useStyles } from '../../../hooks'
import type { ObservableProp } from '../../../types'
import { inject, injectAll } from '../../../utils'
import type { FlexProps } from '../../layout'
import { Flex } from '../../layout'
import styles from './Button.module.scss'

export type ButtonStyles = typeof styles

export type ButtonView = 'primary' | 'secondary'
export type ButtonSize = 'm' | 'l' | 's'

export type ButtonProps<T extends keyof HTMLElementTagNameMap = 'button', S extends ButtonStyles = ButtonStyles> = Omit<FlexProps<T, S>, 'disabled'> & {
  view?: ObservableProp<ButtonView>
  size?: ObservableProp<ButtonSize>
  disabled?: ObservableProp<boolean>
}

export function Button<T extends keyof HTMLElementTagNameMap = 'button', S extends ButtonStyles = ButtonStyles> ({
  size,
  view = 'primary',
  disabled = false,
  ...props
}: ButtonProps<T, S>) {
  const style = useStyles(styles, props.class)

  const root = injectAll([
    style.root,
    inject(view, view => styles[view]),
    inject(size, size => styles[size || 'm']),
  ], classes)

  return (
    <Flex
      inline
      justify='center'
      align='center'
      element='button'
      disabled={inject(disabled, disabled => disabled || undefined)}
      {...props as any}
      class={root}
    />
  )
}
