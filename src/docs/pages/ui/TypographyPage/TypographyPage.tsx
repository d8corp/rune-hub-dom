import type { HighlightExamples } from '@docs/ui'

import { Flex, Markdown, Typography } from '../../../../ui'
import { MarkdownTemplate } from '../../../templates'
import description from './TypographyPage.md'

export default function TypographyPage () {
  const markdownText = `
### Markdown Content

This content is rendered by **Markdown** inside a **Typography** container.

- Heading styles
- Paragraph rhythm
- Formatted lists
`

  const examples: HighlightExamples = {
    basic: (
      <Typography>
        <h3>Typography Heading</h3>
        <p>This paragraph is styled by the Typography container, including standard typography rules for text, lists, and quotes.</p>
        <blockquote>A styled blockquote inside the typography wrapper.</blockquote>
      </Typography>
    ),
    markdown: (
      <Typography>
        <Markdown text={markdownText} />
      </Typography>
    ),
    flex: (
      <Flex gap={16}>
        <Typography flex style={{ border: '1px dashed #06f', padding: '12px' }}>
          <h3>Left Column</h3>
          <p>Flexible block with <code>flex</code> set to <code>true</code> (expands to fill available space).</p>
        </Typography>
        <Typography style={{ width: '160px', border: '1px dashed #999', padding: '12px' }}>
          <h3>Right Column</h3>
          <p>Fixed width block (160px).</p>
        </Typography>
      </Flex>
    ),
  }

  return (
    <MarkdownTemplate text={description} examples={examples} />
  )
}
