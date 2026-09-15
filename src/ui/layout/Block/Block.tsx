import { classes } from 'html-classes'

import { useStyles } from '../../../hooks'
import type { Merge, ObservableProp, RDColor, RDSize } from '../../../types'
import { inject, injectAll } from '../../../utils'
import type { FlexElement, FlexProps } from '../../layout'
import { Flex } from '../../layout'
import $styles from './Block.module.scss'

export type BlockStyles = typeof $styles

export type BlockProps<T extends FlexElement = 'div', S extends BlockStyles = BlockStyles> = Merge<FlexProps<T, S>, {
  color?: ObservableProp<RDColor>
  size?: ObservableProp<RDSize>
  disabled?: ObservableProp<boolean>
  square?: ObservableProp<boolean>
  circle?: ObservableProp<boolean>
}>

export function Block<T extends keyof HTMLElementTagNameMap = 'div', S extends BlockStyles = BlockStyles> ({
  size = 'm',
  color = 'secondary',
  disabled = false,
  square = false,
  circle = false,
  ...props
}: BlockProps<T, S>) {
  const styles = useStyles($styles, props.class)

  const root = injectAll([
    styles.root,
    inject(color, view => styles[view]),
    inject(size, size => styles[size]),
    inject(square, square => square && styles.square),
    inject(circle, circle => circle && styles.circle),
  ], classes)

  return (
    <Flex
      {...props as FlexProps<T, S>}
      disabled={inject(disabled, disabled => disabled || undefined)}
      class={root}
    />
  )
}
