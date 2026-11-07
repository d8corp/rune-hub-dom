import { useStyles } from '../../../hooks'
import { addUiCSS } from '../../../utils'
import type { FlexElement, FlexProps } from '../../primitive'
import { Flex } from '../../primitive'

if (import.meta.env?.RD_THEME_CARD_PREVIEW) {
  addUiCSS(import.meta.env.RD_THEME_CARD_PREVIEW, 'card-preview')
}

export const cardPreviewStyles = {
  root: import.meta.env?.RD_THEME_CARD_PREVIEW__ROOT,
}

export type CardPreviewStyles = typeof cardPreviewStyles

export type CardPreviewProps<T extends FlexElement = 'div', S extends CardPreviewStyles = CardPreviewStyles> = FlexProps<T, S>

export function CardPreviewComponent<T extends FlexElement = 'div', S extends CardPreviewStyles = CardPreviewStyles> (
  props: CardPreviewProps<T, S>,
) {
  const styles = useStyles(cardPreviewStyles, props.class)

  return <Flex<T, S> {...props as FlexProps<T, S>} class={styles.root} />
}

export const CardPreview = import.meta.env?.RD_UI_CARD_PREVIEW
  ? import.meta.require?.(import.meta.env.RD_UI_CARD_PREVIEW).CardPreview as typeof CardPreviewComponent
  : CardPreviewComponent
