import { BaseMarkdown } from '../Markdown'
import { Typography } from '../Typography'

import type { FlexProps } from '../../../ui'
import { Dot, Window, WindowHeader } from '../../../ui'
import { WindowContent } from '../../../ui/popup/Window/WindowContent'
import { inject } from '../../../utils'

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
      <WindowContent>
        <div>
          {props.children}
        </div>
      </WindowContent>
    </Window>
  )
}
