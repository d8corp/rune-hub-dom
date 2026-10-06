import type { HighlightExamples } from '@docs/ui'

import { Code, Flex } from '../../../../ui'
import { MarkdownTemplate } from '../../../templates'
import description from './CodePage.md'

export default function CodePage () {
  const examples: HighlightExamples = {
    basic: (
      <Flex gap={8} wrap>
        <Code>const x = 1</Code>
        <Code>let y = 2</Code>
      </Flex>
    ),
    content: (
      <Flex gap={8} wrap>
        <Code>{'<div>Hello</div>'}</Code>
        <Code>{'const fn = () => {}'}</Code>
      </Flex>
    ),
  }

  return (
    <MarkdownTemplate text={description} examples={examples} />
  )
}
