import { classes } from 'html-classes'

import type { FlexElement, FlexProps } from '../Flex'
import { Flex } from '../Flex'

import { useStyles } from '../../../hooks'
import type { Merge, ObservableProp, RDColor, RDSize } from '../../../types'
import { inject, injectAll, injectCSS } from '../../../utils'

export const inlineClasses = [
  'primary',
  'accent',
  'secondary',
  'success',
  'warning',
  'danger',
  'disabled',
  'square',
  'm',
  's',
  'l',
  'hoverable',
  'clickable',
  'pulse',
] as const satisfies string[]

export const inlineStyles = injectCSS('rd_inline', import.meta.env?.RD_THEME_INLINE, inlineClasses)

export type InlineStyles = typeof inlineStyles

export type InlineProps<T extends FlexElement = 'span', S extends InlineStyles = InlineStyles> = Merge<FlexProps<T, S>, {
  size?: ObservableProp<RDSize>
  color?: ObservableProp<RDColor>
  pulse?: ObservableProp<boolean>
  hoverable?: ObservableProp<boolean>
  square?: ObservableProp<boolean>
}>

export function Inline<T extends FlexElement = 'span', S extends InlineStyles = InlineStyles> ({
  size = 'm',
  color = 'warning',
  pulse,
  hoverable,
  square,
  ...props
}: InlineProps<T, S>) {
  const styles = useStyles(inlineStyles, props.class)

  return (
    <Flex
      element='span'
      {...props as FlexProps<T, S>}
      class={injectAll([
        styles.root,
        props.onclick && styles.clickable,
        inject(size, size => styles[size]),
        inject(color, color => styles[color]),
        inject(pulse, pulse => pulse && styles.pulse),
        inject(hoverable, hoverable => hoverable && styles.hoverable),
        inject(square, square => square && styles.square),
      ], classes)}
    />
  )
}
