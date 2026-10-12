import type { FlexProps } from '../../../ui'
import { Box, Markdown, Typography, Window, WindowHeader } from '../../../ui'
import { WindowContent } from '../../../ui/popup/WindowContent'
import { inject } from '../../../utils'
import styles from '././View.module.scss'

export type ViewProps = FlexProps

export function View ({ title, ...props }: ViewProps) {
  return (
    <Window {...props}>
      <WindowHeader>
        <Box color='danger' circle size='xs' />
        <Box color='warning' circle size='xs' />
        <Box color='success' circle size='xs' />
        <Typography flex>
          <Markdown text={inject(title, (title = '') => title)} />
        </Typography>
      </WindowHeader>
      <WindowContent class={styles.content}>
        <div>
          {props.children}
        </div>
      </WindowContent>
    </Window>
  )
}
