import { useStyles } from '../../../hooks'
import { addUiCSS } from '../../../utils'
import type { FlexElement, FlexProps } from '../../primitive'
import { Flex } from '../../primitive'

if (import.meta.env?.RD_THEME_CARD_DESCRIPTION) {
  addUiCSS(import.meta.env.RD_THEME_CARD_DESCRIPTION, 'card-description')
}

export const cardDescriptionStyles = {
  root: import.meta.env?.RD_THEME_CARD_DESCRIPTION__ROOT,
}

export type CardDescriptionStyles = typeof cardDescriptionStyles

export type CardDescriptionProps<T extends FlexElement = 'div', S extends CardDescriptionStyles = CardDescriptionStyles> = FlexProps<T, S>

export function CardDescriptionComponent<T extends FlexElement = 'div', S extends CardDescriptionStyles = CardDescriptionStyles> (
  props: CardDescriptionProps<T, S>,
) {
  const styles = useStyles(cardDescriptionStyles, props.class)

  return <Flex<T, S> {...props as FlexProps<T, S>} class={styles.root} />
}

export const CardDescription = import.meta.env?.RD_UI_CARD_DESCRIPTION
  ? import.meta.require?.(import.meta.env.RD_UI_CARD_DESCRIPTION).CardDescription as typeof CardDescriptionComponent
  : CardDescriptionComponent
