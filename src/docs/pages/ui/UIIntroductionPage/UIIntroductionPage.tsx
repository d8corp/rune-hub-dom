import type { HighlightExamples } from '@docs/ui'

import { Button, Flex, Input, SearchIcon } from '../../../../ui'
import { MarkdownTemplate } from '../../../templates'
import description from './UIIntroductionPage.md'

export default function UIIntroductionPage () {
  const examples: HighlightExamples = {
    firstComponent: (
      <Flex vertical gap={12} style={{ 'max-width': '320px' }}>
        <Input placeholder='Search components' before={<SearchIcon />} />
        <Flex gap={8}>
          <Button view='filled' color='accent'>
            Create
          </Button>
          <Button view='bordered'>
            Cancel
          </Button>
        </Flex>
      </Flex>
    ),
  }

  return <MarkdownTemplate text={description} examples={examples} />
}
