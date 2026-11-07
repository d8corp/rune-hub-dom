import { useStyles } from '../../../hooks'
import { addUiCSS } from '../../../utils'
import type { FlexElement, FlexProps } from '../../primitive'
import { Flex } from '../../primitive'

if (import.meta.env?.RD_THEME_CARD_CONTENT) {
  addUiCSS(import.meta.env.RD_THEME_CARD_CONTENT, 'card-content')
}

export const cardContentStyles = {
  root: import.meta.env?.RD_THEME_CARD_CONTENT__ROOT,
}

export type CardContentStyles = typeof cardContentStyles

export type CardContentProps<T extends FlexElement = 'div', S extends CardContentStyles = CardContentStyles> = FlexProps<T, S>

export function CardContentComponent<T extends FlexElement = 'div', S extends CardContentStyles = CardContentStyles> (
  props: CardContentProps<T, S>,
) {
  const styles = useStyles(cardContentStyles, props.class)

  return <Flex<T, S> {...props as FlexProps<T, S>} class={styles.root} />
}

export const CardContent = import.meta.env?.RD_UI_CARD_CONTENT
  ? import.meta.require?.(import.meta.env.RD_UI_CARD_CONTENT).CardContent as typeof CardContentComponent
  : CardContentComponent
