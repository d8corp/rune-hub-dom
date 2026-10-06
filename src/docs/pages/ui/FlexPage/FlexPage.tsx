import type { HighlightExamples } from '@docs/ui'

import type { HTMLStyleProp } from '../../../../types'
import { Flex } from '../../../../ui'
import { MarkdownTemplate } from '../../../templates'
import description from './FlexPage.md'

const parent: HTMLStyleProp = {
  border: '1px dashed #999',
}

const child: HTMLStyleProp = {
  border: '1px dashed #7C3AED',
  padding: '4px 8px',
}

export default function FlexPage () {
  const examples: HighlightExamples = {
    element: (
      <Flex gap={8}>
        <Flex element='div'>div</Flex>
        <Flex element='a' href='#element'>a</Flex>
        <Flex element='button'>button</Flex>
      </Flex>
    ),
    align: (
      <Flex gap={8} padding={4} wrap style={{ height: '64px' }}>
        {(['start', 'center', 'end', 'stretch'] as const).map(align => (
          <Flex align={align} padding={4} style={{ border: '1px dashed #999' }}>
            <div style={child}>{align}</div>
          </Flex>
        ))}
      </Flex>
    ),
    justify: (
      <Flex wrap gap={16}>
        {(['start', 'end', 'center', 'space-between', 'space-around'] as const).map(align => (
          <Flex flex justify={align} padding={4} gap={4} style={{ border: '1px dashed #999', 'min-width': '200px' }}>
            <div style={child}>justify</div>
            <div style={child}>{align}</div>
          </Flex>
        ))}
      </Flex>
    ),
    gap: (
      <Flex wrap padding={4} gap={[16, 32]} style={{ border: '1px dashed #999', width: '100px' }}>
        <div style={child}>1</div>
        <div style={child}>2</div>
        <div style={child}>3</div>
      </Flex>
    ),
    inline: (
      <div>
        Text before
        <Flex inline style={{ ...child, margin: '0 4px' }}>inline</Flex>
        text between
        <Flex inline style={{ ...child, margin: '0 4px' }}>flex</Flex>
        text after
      </div>
    ),
    padding: (
      <Flex wrap gap={8} align='center'>
        <Flex padding={16} style={parent}>
          <div style={child}>16</div>
        </Flex>
        <Flex padding={[16, 32]} style={parent}>
          <div style={child}>[16, 32]</div>
        </Flex>
        <Flex padding={[8, 16, 32]} style={parent}>
          <div style={child}>[8, 16, 32]</div>
        </Flex>
        <Flex padding={[0, 8, 16, 32]} style={parent}>
          <div style={child}>[0, 8, 16, 32]</div>
        </Flex>
      </Flex>
    ),
    reverse: (
      <Flex reverse gap={8} padding={4} style={parent}>
        <div style={child}>1</div>
        <div style={child}>2</div>
        <div style={child}>3</div>
      </Flex>
    ),
    vertical: (
      <Flex vertical gap={8} style={parent} padding={4}>
        <div style={child}>1</div>
        <div style={child}>2</div>
        <div style={child}>3</div>
      </Flex>
    ),
    wrap: (
      <Flex wrap gap={8} padding={4} style={{ ...parent, width: '160px' }}>
        <div style={child}>1</div>
        <div style={child}>2</div>
        <div style={child}>3</div>
        <div style={child}>4</div>
        <div style={child}>5</div>
        <div style={child}>6</div>
      </Flex>
    ),
    flex: (
      <Flex wrap gap={8} padding={4} style={parent}>
        <Flex flex justify='center' style={child}>
          flex
        </Flex>
        <Flex flex={2} justify='center' style={child}>
          flex: 2
        </Flex>
        <Flex align='center' justify='center' style={child}>fixed</Flex>
      </Flex>
    ),
  }

  return (
    <MarkdownTemplate text={description} examples={examples} />
  )
}
