import { MarkdownTemplate } from '../../../templates'
import description from './ShowPage.md'

export default function ShowPage () {
  return (
    <MarkdownTemplate text={description} />
  )
}
