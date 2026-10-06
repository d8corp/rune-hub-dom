import type { HighlightExamples } from '@docs/ui'

import { Divider, Flex } from '../../../../ui'
import { MarkdownTemplate } from '../../../templates'
import description from './FlexPage.md'

export default function FlexPage () {
  const examples: HighlightExamples = {
    vertical: (
      <Flex vertical gap={8}>
        <div style={{ background: 'var(--background)', padding: '4px 8px' }}>Item 1</div>
        <div style={{ background: 'var(--background)', padding: '4px 8px' }}>Item 2</div>
        <div style={{ background: 'var(--background)', padding: '4px 8px' }}>Item 3</div>
      </Flex>
    ),
    align: (
      <Flex vertical gap={8} align='stretch' style={{ height: '80px', border: '1px dashed #444' }}>
        <div style={{ background: 'var(--background)', padding: '4px 8px' }}>start</div>
        <div style={{ background: 'var(--background)', padding: '4px 8px' }}>center</div>
        <div style={{ background: 'var(--background)', padding: '4px 8px' }}>end</div>
        <div style={{ background: 'var(--background)', padding: '4px 8px' }}>stretch</div>
        <div style={{ background: 'var(--background)', padding: '4px 8px' }}>baseline</div>
      </Flex>
    ),
    justify: (
      <Flex gap={8} justify='around' style={{ border: '1px dashed #444' }}>
        <div style={{ background: 'var(--background)', padding: '4px 8px' }}>1</div>
        <div style={{ background: 'var(--background)', padding: '4px 8px' }}>2</div>
        <div style={{ background: 'var(--background)', padding: '4px 8px' }}>3</div>
      </Flex>
    ),
    gap: (
      <Flex vertical gap={16}>
        <Flex gap={8}>
          <div style={{ background: 'var(--background)', padding: '4px 8px' }}>gap=8</div>
          <div style={{ background: 'var(--background)', padding: '4px 8px' }}>gap=8</div>
        </Flex>
        <Flex gap={[8, 24]}>
          <div style={{ background: 'var(--background)', padding: '4px 8px' }}>gap=[8,24]</div>
          <div style={{ background: 'var(--background)', padding: '4px 8px' }}>gap=[8,24]</div>
        </Flex>
      </Flex>
    ),
    flex: (
      <Flex gap={8}>
        <Flex flex style={{ background: 'var(--background)', padding: '4px 8px' }}>flex (expands)</Flex>
        <div style={{ background: 'var(--background)', padding: '4px 8px' }}>fixed</div>
      </Flex>
    ),
    wrap: (
      <Flex wrap gap={8} style={{ width: '180px' }}>
        <div style={{ background: 'var(--background)', padding: '4px 8px' }}>1</div>
        <div style={{ background: 'var(--background)', padding: '4px 8px' }}>2</div>
        <div style={{ background: 'var(--background)', padding: '4px 8px' }}>3</div>
        <div style={{ background: 'var(--background)', padding: '4px 8px' }}>4</div>
        <div style={{ background: 'var(--background)', padding: '4px 8px' }}>5</div>
      </Flex>
    ),
    inline: (
      <Flex inline gap={8}>
        <div style={{ background: 'var(--background)', padding: '4px 8px' }}>inline flex 1</div>
        <div style={{ background: 'var(--background)', padding: '4px 8px' }}>inline flex 2</div>
      </Flex>
    ),
    reverse: (
      <Flex vertical reverse gap={8}>
        <div style={{ background: 'var(--background)', padding: '4px 8px' }}>Last</div>
        <div style={{ background: 'var(--background)', padding: '4px 8px' }}>Middle</div>
        <div style={{ background: 'var(--background)', padding: '4px 8px' }}>First</div>
      </Flex>
    ),
    padding: (
      <Flex vertical gap={8}>
        <Divider />
        <Flex padding={16} style={{ background: 'var(--background)' }}>
          padding=16
        </Flex>
        <Flex padding={[8, 16]} style={{ background: 'var(--background)' }}>
          padding=[8,16]
        </Flex>
        <Flex padding={[8, 16, 8, 16]} style={{ background: 'var(--background)' }}>
          padding=[8,16,8,16]
        </Flex>
      </Flex>
    ),
  }

  return (
    <MarkdownTemplate text={description} examples={examples} />
  )
}
