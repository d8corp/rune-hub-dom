import { Typography } from '../../../../ui'
import { Markdown, Page } from '../../../ui'
import description from './RoutingPage.md'

export default function RoutingPage () {
  return (
    <Page>
      <Typography>
        <Markdown text={description} />
      </Typography>
    </Page>
  )
}
