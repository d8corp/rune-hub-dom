import type { HighlightExamples } from '@docs/ui'

import { CloseIcon, Dot, Flex } from '../../../../ui'
import { MarkdownTemplate } from '../../../templates'
import description from './DotPage.md'

export default function DotPage () {
  const examples: HighlightExamples = {
    basic: (
      <Flex gap={8} align='center'>
        <Dot />
        Default dot
      </Flex>
    ),
    content: (
      <Flex gap={8} align='center' wrap>
        <Dot>1</Dot>
        <Dot>13</Dot>
        <Dot>420</Dot>
        <Dot><CloseIcon /></Dot>
      </Flex>
    ),
    color: (
      <Flex gap={8} align='center' wrap>
        <Dot color='primary'>1</Dot>
        <Dot color='accent'>1</Dot>
        <Dot color='secondary'>1</Dot>
        <Dot color='success'>1</Dot>
        <Dot color='warning'>1</Dot>
        <Dot color='danger'>1</Dot>
        <Dot color='disabled'>1</Dot>
      </Flex>
    ),
    size: (
      <Flex gap={16} align='center' wrap>
        <Dot size='s'>1</Dot>
        <Dot size='m'>1</Dot>
        <Dot size='l'>1</Dot>
        <Dot size='l' />
        <Dot size='m' />
        <Dot size='s' />
      </Flex>
    ),
    square: (
      <Flex gap={16} align='center'>
        <Dot square size='s'>1</Dot>
        <Dot square size='m'>1</Dot>
        <Dot square size='l'>1</Dot>
        <Dot square size='l' />
        <Dot square size='m' />
        <Dot square size='s' />
      </Flex>
    ),
    hoverable: (
      <Flex gap={8} align='center'>
        <Dot clickable color='danger' hoverable><CloseIcon /></Dot>
        <Dot clickable color='success' hoverable>Hello!</Dot>
      </Flex>
    ),
    clickable: (
      <Flex gap={8} align='center'>
        <Dot clickable />
        <Dot color='danger' onclick={() => {}} />
      </Flex>
    ),
  }

  return (
    <MarkdownTemplate text={description} examples={examples} />
  )
}
