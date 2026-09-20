import { Typography } from '../../../../ui'
import { Markdown, Page } from '../../../ui'
import description from './RefPage.md'

export default function RefPage () {
  return (
    <Page>
      <Typography>
        <Markdown text={description} />
      </Typography>
    </Page>
  )
}
