import { useStyles } from '../../../hooks'
import type { Merge } from '../../../types'
import { addCSS, inject } from '../../../utils'
import type { FlexElement, FlexProps } from '../../primitive'
import { Flex } from '../../primitive'

export type MessageType = 'success' | 'error' | 'warning' | 'info'

const transform = import.meta.env?.RD_THEME__TRANSFORM__MESSAGE &&
  import.meta.require?.(import.meta.env?.RD_THEME__TRANSFORM__MESSAGE).default

if (import.meta.env?.RD_THEME_MESSAGE) {
  addCSS(import.meta.env.RD_THEME_MESSAGE, 'message')
}

export const messageStyles = {
  root: import.meta.env?.RD_THEME_MESSAGE__ROOT,
  success: import.meta.env?.RD_THEME_MESSAGE__SUCCESS,
  error: import.meta.env?.RD_THEME_MESSAGE__ERROR,
  warning: import.meta.env?.RD_THEME_MESSAGE__WARNING,
  info: import.meta.env?.RD_THEME_MESSAGE__INFO,
  timeout: import.meta.env?.RD_THEME_MESSAGE__TIMEOUT,
}

export type MessageStyles = typeof messageStyles

export type MessageProps<T extends FlexElement = 'div', S extends MessageStyles = MessageStyles> = Merge<FlexProps<T, S>, {
  type?: MessageType
  timeout?: number
}>

function MessageComponent<T extends keyof HTMLElementTagNameMap = 'div', S extends MessageStyles = MessageStyles> ({
  type = 'info',
  timeout,
  ...props
}: MessageProps<T, S>) {
  const styles = useStyles(messageStyles, props.class)

  const root = inject(styles.root, root => [
    root,
    type && styles[type],
    timeout && styles.timeout,
  ])

  return <Flex<T, S> {...props as FlexProps<T, S>} class={root} />
}

export const Message = transform ? transform(MessageComponent) : MessageComponent
