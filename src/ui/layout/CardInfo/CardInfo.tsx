import { useStyles } from '../../../hooks'
import { addUiCSS } from '../../../utils'
import type { FlexElement, FlexProps } from '../../primitive'
import { Flex } from '../../primitive'

if (import.meta.env?.RD_THEME_CARD_INFO) {
  addUiCSS(import.meta.env.RD_THEME_CARD_INFO, 'card-info')
}

export const cardInfoStyles = {
  root: import.meta.env?.RD_THEME_CARD_INFO__ROOT,
}

export type CardInfoStyles = typeof cardInfoStyles

export type CardInfoProps<T extends FlexElement = 'div', S extends CardInfoStyles = CardInfoStyles> = FlexProps<T, S>

export function CardInfoComponent<T extends FlexElement = 'div', S extends CardInfoStyles = CardInfoStyles> (
  props: CardInfoProps<T, S>,
) {
  const styles = useStyles(cardInfoStyles, props.class)

  return <Flex<T, S> vertical {...props as FlexProps<T, S>} class={styles.root} />
}

export const CardInfo = import.meta.env?.RD_UI_CARD_INFO
  ? import.meta.require?.(import.meta.env.RD_UI_CARD_INFO).CardInfo as typeof CardInfoComponent
  : CardInfoComponent
