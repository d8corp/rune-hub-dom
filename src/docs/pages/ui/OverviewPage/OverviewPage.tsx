import { Slot } from 'rune-hub'

import { For, Show } from '../../../../components'
import type { JSXElement } from '../../../../types'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardPreview,
  CardTitle,
  CheckBox,
  Code,
  Divider,
  Eyebrow,
  Flex,
  Input,
  Markdown,
  RadioBox,
  Scrollbar,
  SearchIcon,
  Text,
  Toggle,
  Typography,
} from '../../../../ui'
import { Page, Title } from '../../../ui'
import styles from './OverviewPage.scss'

interface ComponentItem {
  title: string
  href: string
  description: string
  keywords: string
  preview: JSXElement
}

interface ComponentGroup {
  title: string
  items: ComponentItem[]
}

export default function OverviewPage () {
  const search = new Slot(() => '')

  const groups: ComponentGroup[] = [
    {
      title: 'Typography',
      items: [
        {
          title: 'Typography',
          href: '/ui/typography',
          description: 'Styles headings, paragraphs, lists and other content.',
          keywords: 'article text content heading paragraph style',
          preview: (
            <Typography class={styles.typographyPreview}>
              <h3>Heading</h3>
              <p>The quick brown fox jumps over the lazy dog.</p>
            </Typography>
          ),
        },
        {
          title: 'Markdown',
          href: '/ui/markdown',
          description: 'Renders Markdown as reactive HTML.',
          keywords: 'text markdown md rich content',
          preview: (
            <div class={styles.markdownPreview}>
              <Markdown text={'**Bold**\n\n_Italic_ and `code`'} />
            </div>
          ),
        },
        {
          title: 'Text',
          href: '/ui/text',
          description: 'Controls font size, weight, color and wrapping.',
          keywords: 'font size weight color wrap span inline',
          preview: (
            <Flex vertical gap={2}>
              <Text size='xl' weight='700'>Large text</Text>
              <Text size='s' color='muted'>Muted text</Text>
            </Flex>
          ),
        },
        {
          title: 'Eyebrow',
          href: '/ui/eyebrow',
          description: 'Adds a small uppercase label above a heading or section.',
          keywords: 'label kicker overline uppercase caption heading',
          preview: (
            <Flex vertical gap={2} align='center'>
              <Eyebrow>Eyebrow</Eyebrow>
              <Text size='m' weight='700'>Heading</Text>
            </Flex>
          ),
        },
      ],
    },
    {
      title: 'Layout',
      items: [
        {
          title: 'Divider',
          href: '/ui/divider',
          description: 'Separates groups of content with a line.',
          keywords: 'separator line hr',
          preview: (
            <Flex align='center' vertical gap={10} flex>
              <Flex gap={10}>
                <Text size='s' color='muted'>Before</Text>
                <Divider vertical />
                <Text size='s' color='muted'>divider</Text>
              </Flex>
              <Divider />
              <Text size='s' color='muted'>After divider</Text>
            </Flex>
          ),
        },
        {
          title: 'Scrollbar',
          href: '/ui/scrollbar',
          description: 'Adds a styled scrollbar to overflowing areas.',
          keywords: 'scroll overflow list container',
          preview: (
            <Scrollbar size='s' vertical gap={4} style={{ height: '72px', width: '140px' }}>
              {['Apple', 'Banana', 'Cherry', 'Dragon fruit', 'Elderberry'].map(fruit => (
                <div class={styles.scrollItem}>{fruit}</div>
              ))}
            </Scrollbar>
          ),
        },
        {
          title: 'Card',
          href: '/ui/card',
          description: 'Groups content into a preview and a body.',
          keywords: 'card surface preview title description container',
          preview: (
            <Card size='s' style={{ width: '130px' }}>
              <CardContent>
                <CardTitle>Card</CardTitle>
                <CardDescription>Preview and body</CardDescription>
              </CardContent>
            </Card>
          ),
        },
        {
          title: 'Flex',
          href: '/ui/flex',
          description: 'Arranges elements in a flexible row or column.',
          keywords: 'layout flexbox row column gap align justify',
          preview: (
            <Flex vertical gap={6} flex>
              <Flex gap={6} justify='stretch'>
                <Box view='dashed' flex />
                <Box view='dashed' flex />
              </Flex>
              <Flex gap={6} justify='stretch'>
                <Box view='dashed' flex />
                <Box view='dashed' flex />
                <Box view='dashed' flex />
              </Flex>
            </Flex>
          ),
        },
      ],
    },
    {
      title: 'Inline',
      items: [
        {
          title: 'Code',
          href: '/ui/code',
          description: 'Highlights a small piece of code in text.',
          keywords: 'code snippet inline monospace',
          preview: (
            <Flex gap={8} align='center'>
              <Code>rundom</Code>
              <Code>npm i</Code>
            </Flex>
          ),
        },
        {
          title: 'Box',
          href: '/ui/box',
          description: 'A flexible container with colors, views and sizes.',
          keywords: 'container block card color view size square circle',
          preview: (
            <Flex gap={6} align='center'>
              <Box view='filled' />
              <Box view='bordered' />
              <Box view='dashed' />
              <Box view='ghost' />
            </Flex>
          ),
        },
        {
          title: 'Link',
          href: '/ui/link',
          description: 'Navigates between pages of the application.',
          keywords: 'anchor href navigation route url',
          preview: (
            <Text color='primary' decoration='underline'>
              Open the page
            </Text>
          ),
        },
      ],
    },
    {
      title: 'Block',
      items: [
        {
          title: 'Button',
          href: '/ui/button',
          description: 'Triggers an action, submits a form or follows a link.',
          keywords: 'action click submit form cta',
          preview: (
            <Flex gap={6} align='center' wrap>
              <Button size='s' view='filled' color='accent'>Save</Button>
              <Button size='s' view='bordered'>Cancel</Button>
            </Flex>
          ),
        },
        {
          title: 'CheckBox',
          href: '/ui/check-box',
          description: 'Selects one or several independent options.',
          keywords: 'checkbox boolean toggle multiple options form',
          preview: (
            <Flex gap={8} align='center'>
              <CheckBox />
              <CheckBox checked />
              <CheckBox checked={null} />
            </Flex>
          ),
        },
        {
          title: 'RadioBox',
          href: '/ui/radio-box',
          description: 'Selects a single option from a group.',
          keywords: 'radio single choice option form',
          preview: (
            <Flex gap={8} align='center'>
              <RadioBox />
              <RadioBox checked />
            </Flex>
          ),
        },
        {
          title: 'Toggle',
          href: '/ui/toggle',
          description: 'Turns a single option on or off.',
          keywords: 'toggle switch boolean on off setting',
          preview: (
            <Flex gap={8} align='center'>
              <Toggle />
              <Toggle checked />
            </Flex>
          ),
        },
      ],
    },
  ]

  const filteredGroups = new Slot(function filteredGroups () {
    const query = search.value.trim().toLowerCase()

    if (!query) return groups

    return groups.reduce<ComponentGroup[]>((result, group) => {
      const items = group.items.filter(item => {
        return `${item.title} ${item.description} ${item.keywords}`.toLowerCase().includes(query)
      })

      if (items.length) {
        result.push({ ...group, items })
      }

      return result
    }, [])
  })

  const isEmpty = new Slot(() => !filteredGroups.value.length)

  return (
    <Page>
      <Typography>
        <Title title='Overview'>Overview</Title>
        <p>
          Explore the components of Rundom UI. Use the search to quickly find the building block you need.
        </p>
      </Typography>
      <Flex reverse vertical>
        <For of={filteredGroups} key='title'>
          {group => (
            <section class={styles.section}>
              <h2 class={styles.groupTitle}>
                {() => group.value.title}
              </h2>
              <div class={styles.grid}>
                <For of={() => group.value.items} key='href'>
                  {item => (
                    <Card
                      element='a'
                      href={() => item.value.href}
                      size='m'
                      clickable
                    >
                      <CardPreview>{() => item.value.preview}</CardPreview>
                      <CardContent vertical>
                        <CardTitle>{() => item.value.title}</CardTitle>
                        <CardDescription>{() => item.value.description}</CardDescription>
                      </CardContent>
                    </Card>
                  )}
                </For>
              </div>
            </section>
          )}
        </For>
        <Show when={isEmpty}>
          <div class={styles.empty}>No components found</div>
        </Show>
        <div class={styles.search}>
          <Input
            size='l'
            circle
            clearable
            debounce
            value={search}
            placeholder='Search components'
            before={<SearchIcon />}
          />
        </div>
      </Flex>
    </Page>
  )
}
