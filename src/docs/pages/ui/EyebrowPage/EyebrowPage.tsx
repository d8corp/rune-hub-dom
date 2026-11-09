import type { HighlightExamples } from '@docs/ui'

import { Eyebrow, Flex, Text } from '../../../../ui'
import { MarkdownTemplate } from '../../../templates'
import description from './EyebrowPage.md'

export default function EyebrowPage () {
  const examples: HighlightExamples = {
    basic: (
      <Flex vertical gap={6}>
        <Eyebrow>Release notes</Eyebrow>
        <Text size='xxl' weight='700'>Rundom UI 2.0</Text>
      </Flex>
    ),
    color: (
      <Flex gap={12} wrap>
        <Eyebrow color='primary'>Primary</Eyebrow>
        <Eyebrow color='text'>Text</Eyebrow>
        <Eyebrow color='muted'>Muted</Eyebrow>
        <Eyebrow color='dim'>Dim</Eyebrow>
        <Eyebrow color='accent'>Accent</Eyebrow>
        <Eyebrow color='success'>Success</Eyebrow>
        <Eyebrow color='warning'>Warning</Eyebrow>
        <Eyebrow color='danger'>Danger</Eyebrow>
        <Eyebrow color='disabled'>Disabled</Eyebrow>
      </Flex>
    ),
    size: (
      <Flex gap={12} align='center' wrap>
        <Eyebrow size='xxs'>xxs</Eyebrow>
        <Eyebrow size='xs'>xs</Eyebrow>
        <Eyebrow size='s'>s</Eyebrow>
        <Eyebrow size='m'>m</Eyebrow>
        <Eyebrow size='l'>l</Eyebrow>
        <Eyebrow size='xl'>xl</Eyebrow>
        <Eyebrow size='xxl'>xxl</Eyebrow>
      </Flex>
    ),
  }

  return (
    <MarkdownTemplate text={description} examples={examples} />
  )
}
