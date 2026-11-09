import type { MenuItem } from './types'

export const uiMenu: MenuItem[] = [
  {
    title: 'Rundom UI',
    children: [
      {
        href: '/ui/introduction',
        children: 'Introduction',
      },
      {
        href: '/ui/overview',
        children: 'Overview',
      },
      {
        href: '/ui/icons',
        children: 'Icons',
      },
    ],
  },
  {
    title: 'Typography',
    children: [
      {
        href: '/ui/typography',
        children: '<Typography>',
      },
      {
        href: '/ui/markdown',
        children: '<Markdown>',
      },
      {
        href: '/ui/text',
        children: '<Text>',
      },
      {
        href: '/ui/eyebrow',
        children: '<Eyebrow>',
      },
    ],
  },
  {
    title: 'Layout',
    children: [
      {
        href: '/ui/divider',
        children: '<Divider>',
      },
      {
        href: '/ui/scrollbar',
        children: '<Scrollbar>',
      },
      {
        href: '/ui/card',
        children: '<Card>',
      },
      {
        href: '/ui/flex',
        children: '<Flex>',
      },
    ],
  },
  {
    title: 'Inline',
    children: [
      {
        href: '/ui/code',
        children: '<Code>',
      },
      {
        href: '/ui/box',
        children: '<Box>',
      },
      {
        href: '/ui/link',
        children: '<Link>',
      },
    ],
  },
  {
    title: 'Block',
    children: [
      {
        href: '/ui/button',
        children: '<Button>',
      },
      {
        href: '/ui/check-box',
        children: '<CheckBox>',
      },
      {
        href: '/ui/radio-box',
        children: '<RadioBox>',
      },
    ],
  },
]
