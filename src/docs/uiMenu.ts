import type { MenuItem } from './types'

export const uiMenu: MenuItem[] = [
  {
    title: 'Get Started',
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
        href: '/ui/typography',
        children: 'Typography',
      },
      {
        href: '/ui/icons',
        children: 'Icons',
      },
    ],
  },
  {
    title: 'Primitive',
    children: [
      {
        href: '/ui/flex',
        children: '<Flex>',
      },
      {
        href: '/ui/inline',
        children: '<Inline>',
      },
      {
        href: '/ui/block',
        children: '<Block>',
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
