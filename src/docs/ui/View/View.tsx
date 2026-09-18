import { BaseMarkdown } from '../Markdown'

import type { FlexProps } from '../../../ui'
import { Dot, Typography, Window, WindowHeader } from '../../../ui'
import { WindowContent } from '../../../ui/popup/Window/WindowContent'
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
          <BaseMarkdown text={inject(title, (title = '') => title)} />
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
