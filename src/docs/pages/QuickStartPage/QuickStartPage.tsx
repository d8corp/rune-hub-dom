import { MarkdownTemplate } from '../../templates'
import description from './QuickStartPage.md'

export default function QuickStartPage () {
  return <MarkdownTemplate text={description} />
}
