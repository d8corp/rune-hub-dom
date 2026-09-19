import { Show } from '../../../../components'
import { CloseIcon } from '../../../../docs/icons'
import { useStyles } from '../../../../hooks'
import type { Merge } from '../../../../types'
import { injectCSS } from '../../../../utils'
import { Dot } from '../../../inline'
import type { FlexElement, FlexProps } from '../../../primitive'
import { Flex } from '../../../primitive'

export const windowHeaderStyles = injectCSS('window-header', import.meta.env?.RD_THEME_WINDOW_HEADER, [
  'close',
])

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
