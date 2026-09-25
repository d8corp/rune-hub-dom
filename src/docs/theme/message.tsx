import type { UITransformer } from '@/types'
import type { MessageProps } from '@/ui'

const transformer: UITransformer<MessageProps> = (Message) => (props) => {
  return (
    <Message
      {...props}
      style={{
        ...(props.style as any),
        '--rd-message-timeout': props.timeout ? `${props.timeout}s` : undefined,
        'view-transition-name': `rd-message-${Date.now()}`,
      }}
    />
  )
}

export default transformer
