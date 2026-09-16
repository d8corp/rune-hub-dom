import type { MenuItem } from './types'

export const uiMenu: MenuItem[] = [
  {
    title: 'Layout',
    children: [
      {
        href: '/flex',
        children: '<Flex>',
      },
    ],
  },
  {
    title: 'Actions',
    children: [
      {
        href: '/button',
        exact: true,
        children: '<Button>',
      },
      {
        href: '/link',
        exact: true,
        children: '<Link>',
      },
    ],
  },
]
