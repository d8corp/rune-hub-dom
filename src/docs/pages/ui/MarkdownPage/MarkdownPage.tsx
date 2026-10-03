import type { HighlightExamples } from '@docs/ui'
import { Slot } from 'rune-hub'

import { Button, Flex, Markdown, Typography } from '../../../../ui'
import { MarkdownTemplate } from '../../../templates'
import description from './MarkdownPage.md'

export default function MarkdownPage () {
  const reactiveText = new Slot(() => 'Some text.')

  const update = () => {
    reactiveText.set(`New reactive content! **${Math.random()}**`)
  }

  const examples: HighlightExamples = {
    text: (
      <Markdown text={'### Hello World\n\nThis is **markdown** content.'} />
    ),
    typography: (
      <Typography>
        <Markdown text='This is **markdown** content inside `<Typography>`.' />
      </Typography>
    ),
    reactiveText: (
      <Flex vertical gap={8}>
        <Typography>
          <Markdown text={reactiveText} />
        </Typography>
        <Button onclick={update}>Update</Button>
      </Flex>
    ),
    customMap: (
      <Markdown
        text='Hello *world*!'
        map={{
          Emphasis: ({ children }, render) => (
            <span style={{ color: 'red' }}>
              {children?.map(child => render(child, render))}
            </span>
          ),
        }}
      />
    ),
  }

  return (
    <MarkdownTemplate text={description} examples={examples} />
  )
}
