import type { HighlightExamples } from '@docs/ui'

import {
  Card,
  CardDescription,
  CardInfo,
  CardPreview,
  CardTitle,
  CopyIcon,
  Flex,
  SearchIcon,
  SunIcon,
} from '../../../../ui'
import { MarkdownTemplate } from '../../../templates'
import description from './CardPage.md'

export default function CardPage () {
  const examples: HighlightExamples = {
    basic: (
      <Card style={{ width: '220px' }}>
        <CardInfo>
          <CardTitle>Card title</CardTitle>
          <CardDescription>Card content goes here.</CardDescription>
        </CardInfo>
      </Card>
    ),
    preview: (
      <Card style={{ width: '220px' }}>
        <CardPreview>
          <SearchIcon size={24} />
        </CardPreview>
        <CardInfo>
          <CardTitle>Search</CardTitle>
          <CardDescription>Find anything in the documentation.</CardDescription>
        </CardInfo>
      </Card>
    ),
    sizes: (
      <Flex gap={16} wrap>
        <Card size='s' style={{ width: '180px' }}>
          <CardPreview>
            <SunIcon size={20} />
          </CardPreview>
          <CardInfo>
            <CardTitle>Small</CardTitle>
          </CardInfo>
        </Card>
        <Card size='m' style={{ width: '220px' }}>
          <CardPreview>
            <CopyIcon size={24} />
          </CardPreview>
          <CardInfo>
            <CardTitle>Medium</CardTitle>
          </CardInfo>
        </Card>
        <Card size='l' style={{ width: '260px' }}>
          <CardPreview>
            <SearchIcon size={28} />
          </CardPreview>
          <CardInfo>
            <CardTitle>Large</CardTitle>
          </CardInfo>
        </Card>
      </Flex>
    ),
    interactive: (
      <Card hoverable clickable style={{ width: '220px' }}>
        <CardPreview>
          <SunIcon size={24} />
        </CardPreview>
        <CardInfo>
          <CardTitle>Interactive</CardTitle>
          <CardDescription>Hover or focus the card to see the state.</CardDescription>
        </CardInfo>
      </Card>
    ),
    link: (
      <Card element='a' href='/ui/overview' hoverable style={{ width: '220px' }}>
        <CardPreview>
          <SearchIcon size={24} />
        </CardPreview>
        <CardInfo>
          <CardTitle>Overview</CardTitle>
          <CardDescription>Browse all components from a single page.</CardDescription>
        </CardInfo>
      </Card>
    ),
  }

  return <MarkdownTemplate text={description} examples={examples} />
}
