import { DelayPage, Markdown, Typography } from '../../ui'
import description from './UseStylesPage.md'

export default function UseStylesPage () {
  return (
    <DelayPage>
      <Typography>
        <Markdown text={description} />
      </Typography>
    </DelayPage>
  )
}
