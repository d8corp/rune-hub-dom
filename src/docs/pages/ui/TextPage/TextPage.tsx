import type { HighlightExamples } from '@docs/ui'

import type { HTMLStyleProp } from '../../../../types'
import { Flex, Text } from '../../../../ui'
import { MarkdownTemplate } from '../../../templates'
import description from './TextPage.md'

export default function TextPage () {
  const nowrapStyle: HTMLStyleProp = {
    width: '100px',
    border: '1px dashed #06f',
    padding: '2px 8px',
    overflow: 'hidden',
  }

  const examples: HighlightExamples = {
    size: (
      <Flex gap={8} align='center' wrap>
        <Text size={10}>Size 10</Text>
        <Text size={14}>Size 14</Text>
        <Text size={16}>Size 16</Text>
        <Text size={20}>Size 20</Text>
        <Text size={24}>Size 24</Text>
        <Text size='1.5em'>Size 1.5em</Text>
      </Flex>
    ),
    weight: (
      <Flex gap={8} align='center' wrap>
        <Text weight='normal'>Normal weight</Text>
        <Text weight='lighter'>Lighter weight</Text>
        <Text weight='bold'>Bold weight</Text>
        <Text weight='bolder'>Bolder weight</Text>
        <Text weight='100'>100</Text>
        <Text weight='200'>200</Text>
        <Text weight='300'>300</Text>
        <Text weight='400'>400</Text>
        <Text weight='500'>500</Text>
        <Text weight='600'>600</Text>
        <Text weight='700'>700</Text>
        <Text weight='800'>800</Text>
        <Text weight='900'>900</Text>
      </Flex>
    ),
    color: (
      <Flex gap={8} wrap>
        <Text color='#f06'>Red</Text>
        <Text color='#06f'>Blue</Text>
        <Text color='green'>Green</Text>
      </Flex>
    ),
    italic: (
      <Flex gap={8} wrap>
        <Text>Normal text</Text>
        <Text italic>Italic text</Text>
      </Flex>
    ),
    align: (
      <Flex gap={8} align='stretch' vertical>
        <Text align='left'>Left aligned</Text>
        <Text align='center'>Center aligned</Text>
        <Text align='right'>Right aligned</Text>
        <Text align='justify' style={{ width: '120px' }}>
          Justify aligned text that wraps to show the effect
        </Text>
      </Flex>
    ),
    decoration: (
      <Flex gap={8} wrap>
        <Text decoration='auto'>Auto</Text>
        <Text decoration='underline'>Underlined</Text>
        <Text decoration='line-through'>Line through</Text>
        <Text decoration='overline'>Overlined</Text>
      </Flex>
    ),
    wrap: (
      <Flex gap={8} wrap>
        <Text wrap='nowrap' style={nowrapStyle}>
          No wrap for this text
        </Text>
        <Text wrap='wrap' style={nowrapStyle}>
          This is text that wraps with normalized lines
        </Text>
        <Text wrap='balance' style={nowrapStyle}>
          This is text that wraps with balanced lines
        </Text>
      </Flex>
    ),
    nowrap: (
      <Flex gap={8} wrap>
        <Text style={nowrapStyle}>
          This is a long text that wraps normally
        </Text>
        <Text nowrap={2} style={nowrapStyle}>
          This text is clamped to 2 lines showing the line-clamp effect
        </Text>
        <Text nowrap style={nowrapStyle}>
          This is a long text that does not wrap (nowrap)
        </Text>
      </Flex>
    ),
    break: (
      <Flex gap={8} wrap>
        <Text break='normal' style={nowrapStyle}>
          (normal)
          Longwordwithoutspace
        </Text>
        <Text break='break-all' style={nowrapStyle}>
          (break-all)
          Longwordwithoutspace
        </Text>
        <Text break='keep-all' style={nowrapStyle}>
          (keep-all)
          Longwordwithoutspace
        </Text>
        <Text break='break-word' style={nowrapStyle}>
          (break-word)
          Longwordwithoutspace
        </Text>
      </Flex>
    ),
    cursor: (
      <Flex gap={8} wrap>
        <Text cursor='pointer'>Pointer cursor</Text>
        <Text cursor='wait'>Wait cursor</Text>
        <Text cursor='text'>Text cursor</Text>
        <Text cursor='move'>Move cursor</Text>
      </Flex>
    ),
  }

  return (
    <MarkdownTemplate text={description} examples={examples} />
  )
}
