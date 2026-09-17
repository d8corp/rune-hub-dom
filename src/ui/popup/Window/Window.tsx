import { useStyles } from '../../../hooks'
import { injectCSS } from '../../../utils'
import type { FlexElement, FlexProps } from '../../primitive'
import { Flex } from '../../primitive'

export const windowStyles = injectCSS('rd_window', import.meta.env?.RD_THEME_WINDOW, [])

export type WindowStyles = typeof windowStyles

export type WindowProps<T extends FlexElement = 'div', S extends WindowStyles = WindowStyles> = FlexProps<T, S>

export function Window<T extends keyof HTMLElementTagNameMap = 'div', S extends WindowStyles = WindowStyles> (
  props: WindowProps<T, S>,
) {
  const styles = useStyles(windowStyles, props.class)

  return <Flex<T, S> vertical {...props as FlexProps<T, S>} class={styles.root} />
}
