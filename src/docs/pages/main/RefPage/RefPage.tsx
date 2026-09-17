import { BasePage, Markdown, Typography } from '../../../ui'
import description from './RefPage.md'

export default function RefPage () {
  return (
    <BasePage>
      <Typography>
        <Markdown text={description} />
      </Typography>
    </BasePage>
  )
}
