import type { MessageProps } from '../..'
import { MessageComponent } from '../..'

export function Message (props: MessageProps) {
  return (
    <MessageComponent
      {...props}
      style={{
        ...(props.style as any),
        '--rd-message-timeout': props.timeout ? `${props.timeout}s` : undefined,
        'view-transition-name': `rd-message-${Date.now()}`,
      }}
    />
  )
}
