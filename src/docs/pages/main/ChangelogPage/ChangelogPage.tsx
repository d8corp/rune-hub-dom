import changelog from '../../../../../CHANGELOG.md'
import { MarkdownTemplate } from '../../../templates'

export default function ChangelogPage () {
  return <MarkdownTemplate text={changelog} />
}
