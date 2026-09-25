import { Show } from '../../../components'
import { CloseIcon } from '../../../docs/icons'
import { useStyles } from '../../../hooks'
import type { Merge } from '../../../types'
import { addCSS } from '../../../utils'
import { Dot } from '../../inline'
import type { FlexElement, FlexProps } from '../../primitive'
import { Flex } from '../../primitive'

if (import.meta.env?.RD_THEME_WINDOW_HEADER) {
  addCSS(import.meta.env.RD_THEME_WINDOW_HEADER, 'window-header')
}

export const windowHeaderStyles = {
  root: import.meta.env?.RD_THEME_WINDOW_HEADER__ROOT,
  close: import.meta.env?.RD_THEME_WINDOW_HEADER__CLOSE,
}

export type WindowHeaderStyles = typeof windowHeaderStyles

export type WindowHeaderProps<T extends FlexElement = 'header', S extends WindowHeaderStyles = WindowHeaderStyles> = Merge<FlexProps<T, S>, {
  onClose?: () => void;
}>

export function WindowHeader<T extends FlexElement = 'header', S extends WindowHeaderStyles = WindowHeaderStyles> ({
  onClose,
  children,
  ...props
}: WindowHeaderProps<T, S>) {
  const styles = useStyles(windowHeaderStyles, props.class)

  return (
    <Flex<T, S> element='header' {...props as FlexProps<T, S>} class={styles.root}>
      <Show when={Boolean(onClose)}>
        <Dot hoverable color='danger' class={styles.close} onclick={onClose}>
          <CloseIcon />
        </Dot>
      </Show>
      {children}
    </Flex>
  )
}
