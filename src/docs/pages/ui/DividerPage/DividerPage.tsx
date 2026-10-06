import type { HighlightExamples } from '@docs/ui'

import { Divider, Flex } from '../../../../ui'
import { MarkdownTemplate } from '../../../templates'
import description from './DividerPage.md'

export default function DividerPage () {
  const examples: HighlightExamples = {
    basic: (
      <Flex vertical gap={8}>
        Content above
        <Divider />
        Content below
      </Flex>
    ),
    size: (
      <Flex vertical gap={8}>
        Small divider
        <Divider size='s' />
        Medium divider (default)
        <Divider size='m' />
        Large divider
        <Divider size='l' />
      </Flex>
    ),
    vertical: (
      <Flex gap={16} align='center'>
        Left
        <Divider vertical />
        Right
      </Flex>
    ),
    flush: (
      <Flex vertical>
        <Divider flush />
        <Flex gap={8}>
          Vertical
          <Divider vertical flush />
          flush
          <Divider vertical />
          not
          <Divider vertical />
          flush
        </Flex>
        <Divider flush />
      </Flex>
    ),
  }

  return (
    <MarkdownTemplate text={description} examples={examples} />
  )
}
