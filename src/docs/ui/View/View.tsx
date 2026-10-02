import type { FlexProps } from '../../../ui'
import { Dot, Markdown, Typography, Window, WindowHeader } from '../../../ui'
import { WindowContent } from '../../../ui/popup/WindowContent'
import { inject } from '../../../utils'
import styles from '././View.module.scss'

export type ViewProps = FlexProps

export function View ({ title, ...props }: ViewProps) {
  return (
    <Window {...props}>
      <WindowHeader>
        <Dot color='danger' />
        <Dot color='warning' />
        <Dot color='success' />
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
