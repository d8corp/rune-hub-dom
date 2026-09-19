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
        href: '/ui/divider',
        children: '<Divider>',
      },
      {
        href: '/ui/markdown',
        children: '<Markdown>',
      },
      {
        href: '/ui/section',
        children: '<Section>',
      },
      {
        href: '/ui/title',
        children: '<Title>',
      },
    ],
  },
  {
    title: 'Layout',
    children: [
      {
        href: '/ui/details',
        children: '<Details>',
      },
      {
        href: '/ui/flex',
        children: '<Flex>',
      },
      {
        href: '/ui/image',
        children: '<Image>',
      },
      {
        href: '/ui/layout',
        children: '<Layout>',
      },
      {
        href: '/ui/space',
        children: '<Space>',
      },
    ],
  },
  {
    title: 'Popups',
    children: [
      {
        href: '/ui/alert',
        children: '<Alert>',
      },
      {
        href: '/ui/notifications',
        children: '<Notifications>',
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
        href: '/ui/divider',
        children: '<Divider>',
      },
      {
        href: '/ui/dot',
        children: '<Dot>',
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
    ],
  },
]
