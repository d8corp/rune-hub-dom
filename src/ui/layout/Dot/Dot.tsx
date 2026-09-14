import { classes } from 'html-classes'

import type { FlexElement, FlexProps } from '../Flex'
import { Flex } from '../Flex'

import { useStyles } from '../../../hooks'
import type { Merge, ObservableProp, RDColor, RDSize } from '../../../types'
import { inject, injectAll } from '../../../utils'
import $styles from './Dot.module.scss'

export type DotStyles = typeof $styles

export type DotProps<T extends FlexElement = 'span', S extends DotStyles = DotStyles> = Merge<FlexProps<T, S>, {
  size?: ObservableProp<RDSize>
  color?: ObservableProp<RDColor>
  pulse?: ObservableProp<boolean>
  hoverable?: ObservableProp<boolean>
}>

export function Dot<T extends FlexElement = 'span', S extends DotStyles = DotStyles> ({
  size = 'm',
  color = 'warning',
  pulse,
  hoverable,
  ...props
}: DotProps<T, S>) {
  const styles = useStyles($styles, props.class)

  return (
    <Flex
      element='span'
      align='center'
      justify='center'
      {...props as FlexProps<T, S>}
      class={injectAll([
        styles.root,
        props.onclick && styles.clickable,
        inject(size, size => styles[size]),
        inject(color, color => styles[color]),
        inject(pulse, pulse => pulse && styles.pulse),
        inject(hoverable, hoverable => hoverable && styles.hoverable),
      ], classes)}
    />
  )
}
