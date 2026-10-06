import type { HighlightExamples } from '@docs/ui'
import { Slot } from 'rune-hub'

import type { HTMLStyleProp } from '../../../../types'
import { Button, Flex, Scrollbar } from '../../../../ui'
import { MarkdownTemplate } from '../../../templates'
import description from './ScrollbarPage.md'

export default function ScrollbarPage () {
  const text = 'Scrollable content goes here Scrollable content goes here Scrollable content goes here Longwordwithoutspace'
  const style: HTMLStyleProp = { height: '80px', width: '80px' }
  const stable = new Slot(() => false)
  const scrollbar = new Slot(() => false)

  const toggleStable = () => stable.set(!stable.raw)
  const toggleScrollbar = () => scrollbar.set(!scrollbar.raw)

  const examples: HighlightExamples = {
    basic: (
      <Scrollbar style={style}>
        {text}
      </Scrollbar>
    ),
    size: (
      <Flex gap={16} wrap>
        <Scrollbar size='s' style={style}>
          Small scrollbar
          {text}
        </Scrollbar>
        <Scrollbar size='m' style={style}>
          Medium scrollbar (default)
          {text}
        </Scrollbar>
        <Scrollbar size='l' style={style}>
          Large scrollbar
          {text}
        </Scrollbar>
      </Flex>
    ),
    stable: (
      <Flex gap={8} vertical>
        <Flex gap={8} wrap>
          <Button onclick={toggleStable} color={() => stable.value ? 'primary' : 'secondary'}>
            Stable
          </Button>
          <Button onclick={toggleScrollbar} color={() => scrollbar.value ? 'primary' : 'secondary'}>
            Scrollbar
          </Button>
        </Flex>
        <Scrollbar
          stable={stable}
          padding={4}
          style={{
            width: '100px',
            height: '80px',
            border: '1px dashed #999',
          }}
        >
          <div
            style={{
              border: '1px dashed #06f',
              height: () => scrollbar.value ? '200%' : 'auto',
            }}
          >
            Scrollable content goes here
          </div>
        </Scrollbar>
      </Flex>
    ),
    overflow: (
      <Flex gap={16} wrap>
        <Scrollbar overflow='auto' style={style}>
          Auto overflow (default) {text}
        </Scrollbar>
        <Scrollbar overflow='scroll' style={style}>
          Always show scrollbar
        </Scrollbar>
        <Scrollbar overflow='hidden' style={style}>
          Hidden overflow {text}
        </Scrollbar>
        <Scrollbar overflow='auto hidden' style={style}>
          Horizontal only {text}
        </Scrollbar>
        <Scrollbar overflow='hidden auto' style={style}>
          Vertical only {text}
        </Scrollbar>
      </Flex>
    ),
  }

  return (
    <MarkdownTemplate text={description} examples={examples} />
  )
}
