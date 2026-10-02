import { MarkdownTemplate } from '@docs/templates'

import description from './RefPage.md'

export default function RefPage () {
  return <MarkdownTemplate text={description} />
}
