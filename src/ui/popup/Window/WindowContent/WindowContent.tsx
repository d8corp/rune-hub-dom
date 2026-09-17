import { useStyles } from '../../../../hooks'
import type { Merge } from '../../../../types'
import { injectCSS } from '../../../../utils'
import type { FlexElement, FlexProps } from '../../../primitive'
import { Flex } from '../../../primitive'

export const windowContentStyles = injectCSS('rd_window-content', import.meta.env?.RD_THEME_WINDOW_CONTENT, [])

export type WindowContentStyles = typeof windowContentStyles

export type WindowContentProps<T extends FlexElement = 'div', S extends WindowContentStyles = WindowContentStyles> = Merge<FlexProps<T, S>, {}>

export function WindowContent<T extends FlexElement = 'div', S extends WindowContentStyles = WindowContentStyles> (
  props: WindowContentProps<T, S>,
) {
  const styles = useStyles(windowContentStyles, props.class)

  return <Flex<T, S> {...props as FlexProps<T, S>} class={styles.root} />
}
