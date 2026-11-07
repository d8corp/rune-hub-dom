import { useStyles } from '../../../hooks'
import { addUiCSS } from '../../../utils'
import type { FlexElement, FlexProps } from '../../primitive'
import { Flex } from '../../primitive'

if (import.meta.env?.RD_THEME_CARD_TITLE) {
  addUiCSS(import.meta.env.RD_THEME_CARD_TITLE, 'card-title')
}

export const cardTitleStyles = {
  root: import.meta.env?.RD_THEME_CARD_TITLE__ROOT,
}

export type CardTitleStyles = typeof cardTitleStyles

export type CardTitleProps<T extends FlexElement = 'div', S extends CardTitleStyles = CardTitleStyles> = FlexProps<T, S>

export function CardTitleComponent<T extends FlexElement = 'div', S extends CardTitleStyles = CardTitleStyles> (
  props: CardTitleProps<T, S>,
) {
  const styles = useStyles(cardTitleStyles, props.class)

  return <Flex<T, S> {...props as FlexProps<T, S>} class={styles.root} />
}

export const CardTitle = import.meta.env?.RD_UI_CARD_TITLE
  ? import.meta.require?.(import.meta.env.RD_UI_CARD_TITLE).CardTitle as typeof CardTitleComponent
  : CardTitleComponent
