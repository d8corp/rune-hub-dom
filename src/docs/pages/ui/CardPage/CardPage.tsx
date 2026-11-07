import type { HighlightExamples } from '@docs/ui'

import {
  Card,
  CardContent,
  CardDescription,
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
        <CardContent>
          <CardTitle>Card title</CardTitle>
          <CardDescription>Card content goes here.</CardDescription>
        </CardContent>
      </Card>
    ),
    preview: (
      <Card style={{ width: '220px' }}>
        <CardPreview>
          <SearchIcon size={24} />
        </CardPreview>
        <CardContent>
          <CardTitle>Search</CardTitle>
          <CardDescription>Find anything in the documentation.</CardDescription>
        </CardContent>
      </Card>
    ),
    sizes: (
      <Flex gap={16} wrap>
        <Card size='s' style={{ width: '180px' }}>
          <CardPreview>
            <SunIcon size={20} />
          </CardPreview>
          <CardContent>
            <CardTitle>Small</CardTitle>
          </CardContent>
        </Card>
        <Card size='m' style={{ width: '220px' }}>
          <CardPreview>
            <CopyIcon size={24} />
          </CardPreview>
          <CardContent>
            <CardTitle>Medium</CardTitle>
          </CardContent>
        </Card>
        <Card size='l' style={{ width: '260px' }}>
          <CardPreview>
            <SearchIcon size={28} />
          </CardPreview>
          <CardContent>
            <CardTitle>Large</CardTitle>
          </CardContent>
        </Card>
      </Flex>
    ),
    interactive: (
      <Card hoverable clickable style={{ width: '220px' }}>
        <CardPreview>
          <SunIcon size={24} />
        </CardPreview>
        <CardContent>
          <CardTitle>Interactive</CardTitle>
          <CardDescription>Hover or focus the card to see the state.</CardDescription>
        </CardContent>
      </Card>
    ),
    link: (
      <Card element='a' href='/ui/overview' hoverable style={{ width: '220px' }}>
        <CardPreview>
          <SearchIcon size={24} />
        </CardPreview>
        <CardContent>
          <CardTitle>Overview</CardTitle>
          <CardDescription>Browse all components from a single page.</CardDescription>
        </CardContent>
      </Card>
    ),
  }

  return <MarkdownTemplate text={description} examples={examples} />
}
