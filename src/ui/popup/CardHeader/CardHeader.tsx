import { useStyles } from '../../../hooks'
import { addUiCSS } from '../../../utils'
import type { FlexElement, FlexProps } from '../../primitive'
import { Flex } from '../../primitive'

if (import.meta.env?.RD_THEME_CARD_HEADER) {
  addUiCSS(import.meta.env.RD_THEME_CARD_HEADER, 'card-header')
}

export const cardHeaderStyles = {
  root: import.meta.env?.RD_THEME_CARD_HEADER__ROOT,
}

export type CardHeaderStyles = typeof cardHeaderStyles

export type CardHeaderProps<T extends FlexElement = 'header', S extends CardHeaderStyles = CardHeaderStyles> = FlexProps<T, S>

export function CardHeaderComponent<T extends FlexElement = 'header', S extends CardHeaderStyles = CardHeaderStyles> (
  props: CardHeaderProps<T, S>,
) {
  const styles = useStyles(cardHeaderStyles, props.class)

  return <Flex<T, S> element='header' {...props as FlexProps<T, S>} class={styles.root} />
}

export const CardHeader = import.meta.env?.RD_UI_CARD_HEADER
  ? import.meta.require?.(import.meta.env.RD_UI_CARD_HEADER).CardHeader as typeof CardHeaderComponent
  : CardHeaderComponent
