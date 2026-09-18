import { Typography } from '../../../../ui'
import { BasePage, Markdown } from '../../../ui'
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
