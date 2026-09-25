import { useStyles } from '../../../hooks'
import { addCSS } from '../../../utils'
import type { FlexElement, FlexProps } from '../../primitive'
import { Flex } from '../../primitive'

const transform = import.meta.env?.RD_THEME__TRANSFORM__WINDOW &&
  import.meta.require?.(import.meta.env.RD_THEME__TRANSFORM__WINDOW).default

if (import.meta.env?.RD_THEME_WINDOW) {
  addCSS(import.meta.env.RD_THEME_WINDOW, 'window')
}

export const windowStyles = {
  root: import.meta.env?.RD_THEME_WINDOW__ROOT,
}

export type WindowStyles = typeof windowStyles

export type WindowProps<T extends FlexElement = 'div', S extends WindowStyles = WindowStyles> = FlexProps<T, S>

function WindowComponent<T extends keyof HTMLElementTagNameMap = 'div', S extends WindowStyles = WindowStyles> (
  props: WindowProps<T, S>,
) {
  const styles = useStyles(windowStyles, props.class)

  return <Flex<T, S> vertical {...props as FlexProps<T, S>} class={styles.root} />
}

export const Window = transform
  ? transform(WindowComponent) as typeof WindowComponent
  : WindowComponent
