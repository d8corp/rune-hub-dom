import { DelayPage, Markdown, Typography } from '../../ui'
import description from './ComponentsPage.md'

export default function ComponentsPage () {
  return (
    <DelayPage>
      <Typography>
        <Markdown text={description} glow />
      </Typography>
    </DelayPage>
  )
}
