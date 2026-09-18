import { Typography } from '../../../../ui'
import { BasePage, Markdown } from '../../../ui'
import description from './RoutingPage.md'

export default function RoutingPage () {
  return (
    <BasePage>
      <Typography>
        <Markdown text={description} />
      </Typography>
    </BasePage>
  )
}
