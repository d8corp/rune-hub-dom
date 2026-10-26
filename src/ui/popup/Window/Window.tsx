import { useStyles } from '../../../hooks'
import { addUiCSS } from '../../../utils'
import type { CardProps } from '../../layout/Card'
import { Card } from '../../layout/Card'
import type { FlexElement } from '../../primitive'

const transform = import.meta.env?.RD_THEME__TRANSFORM__WINDOW &&
  import.meta.require?.(import.meta.env.RD_THEME__TRANSFORM__WINDOW).default

if (import.meta.env?.RD_THEME_WINDOW) {
  addUiCSS(import.meta.env.RD_THEME_WINDOW, 'window')
}

export const windowStyles = {
  root: import.meta.env?.RD_THEME_WINDOW__ROOT,
  clickable: import.meta.env?.RD_THEME_WINDOW__CLICKABLE,
  m: import.meta.env?.RD_THEME_WINDOW__M,
  s: import.meta.env?.RD_THEME_WINDOW__S,
  l: import.meta.env?.RD_THEME_WINDOW__L,
}

export type WindowStyles = typeof windowStyles

export type WindowProps<T extends FlexElement = 'div', S extends WindowStyles = WindowStyles> = CardProps<T, S>

function WindowComponent<T extends FlexElement = 'div', S extends WindowStyles = WindowStyles> (
  props: WindowProps<T, S>,
) {
  const styles = useStyles(windowStyles, props.class)

  return <Card vertical {...props} class={styles} />
}

export const Window = transform
  ? transform(WindowComponent) as typeof WindowComponent
  : WindowComponent
