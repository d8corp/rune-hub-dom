import { classes } from 'html-classes'

import { useStyles } from '../../../hooks'
import type { Merge, ObservableProp, RDSize } from '../../../types'
import { addCSS, inject, injectAll } from '../../../utils'
import type { FlexElement, FlexProps } from '../../primitive'
import { Flex } from '../../primitive'

if (import.meta.env?.RD_THEME_CARD) {
  addCSS(import.meta.env.RD_THEME_CARD, 'card')
}

export const cardStyles = {
  root: import.meta.env?.RD_THEME_CARD__ROOT,
  clickable: import.meta.env?.RD_THEME_CARD__CLICKABLE,
  m: import.meta.env?.RD_THEME_CARD__M,
  s: import.meta.env?.RD_THEME_CARD__S,
  l: import.meta.env?.RD_THEME_CARD__L,
}

export type CardStyles = typeof cardStyles

export type CardProps<T extends FlexElement = 'div', S extends CardStyles = CardStyles> = Merge<FlexProps<T, S>, {
  size?: ObservableProp<RDSize | undefined>
  clickable?: ObservableProp<boolean | undefined>
  width?: ObservableProp<string | number | undefined>
  height?: ObservableProp<string | number | undefined>
}>

export function CardComponent<T extends FlexElement = 'div', S extends CardStyles = CardStyles> ({
  size,
  onclick,
  clickable = Boolean(onclick),
  width,
  height,
  style,
  ...props
}: CardProps<T, S>) {
  const styles = useStyles(cardStyles, props.class)

  const root = injectAll([
    styles.root,
    inject(size, size => size && styles[size]),
    inject(clickable, clickable => clickable && styles.clickable),
  ], classes)

  return (
    <Flex
      {...props as FlexProps<T, S>}
      class={root}
      onclick={onclick}
      style={{
        ...style,
        width: inject(width, width => typeof width === 'number' ? `${width}px` : width),
        height: inject(height, height => typeof height === 'number' ? `${height}px` : height),
      }}
    />
  )
}

export const Card = import.meta.env?.RD_UI_CARD
  ? import.meta.require?.(import.meta.env.RD_UI_CARD).Card as typeof CardComponent
  : CardComponent
