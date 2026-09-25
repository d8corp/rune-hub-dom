import { useStyles } from '../../../hooks'
import type { Merge } from '../../../types'
import { addCSS } from '../../../utils'
import type { FlexElement, FlexProps } from '../../primitive'
import { Flex } from '../../primitive'

if (import.meta.env?.RD_THEME_WINDOW_CONTENT) {
  addCSS(import.meta.env.RD_THEME_WINDOW_CONTENT, 'window-content')
}

export const windowContentStyles = {
  root: import.meta.env?.RD_THEME_WINDOW_CONTENT__ROOT,
}

export type WindowContentStyles = typeof windowContentStyles

export type WindowContentProps<T extends FlexElement = 'div', S extends WindowContentStyles = WindowContentStyles> = Merge<FlexProps<T, S>, {}>

export function WindowContent<T extends FlexElement = 'div', S extends WindowContentStyles = WindowContentStyles> (
  props: WindowContentProps<T, S>,
) {
  const styles = useStyles(windowContentStyles, props.class)

  return <Flex<T, S> {...props as FlexProps<T, S>} class={styles.root} />
}
