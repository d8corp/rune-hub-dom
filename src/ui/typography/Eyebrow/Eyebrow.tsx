import type { TextColor, TextProps } from '../Text'
import { Text } from '../Text'

import { useStyles } from '../../../hooks'
import { addUiCSS } from '../../../utils'

export type EyebrowColor = TextColor

if (import.meta.env?.RD_THEME_EYEBROW) {
  addUiCSS(import.meta.env.RD_THEME_EYEBROW, 'eyebrow')
}

export const eyebrowStyles = {
  root: import.meta.env?.RD_THEME_EYEBROW__ROOT,
}

export type EyebrowStyles = typeof eyebrowStyles

export interface EyebrowProps extends TextProps {}

export function EyebrowComponent ({
  color = 'primary',
  size = 'xs',
  ...props
}: EyebrowProps) {
  const styles = useStyles(eyebrowStyles, props.class)

  return <Text {...props} color={color} size={size} class={styles} />
}

export const Eyebrow = import.meta.env?.RD_UI_EYEBROW
  ? import.meta.require?.(import.meta.env.RD_UI_EYEBROW).Eyebrow as typeof EyebrowComponent
  : EyebrowComponent
