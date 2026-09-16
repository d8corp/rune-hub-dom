import type { MenuItem } from './types'

export const menu: MenuItem[] = [
  {
    title: 'Getting Started',
    children: [
      {
        href: '/quick-start',
        children: 'Quick Start',
      },
      {
        href: '/jsx-elements',
        children: 'JSX Elements',
      },
      {
        href: '/jsx-dom-elements',
        children: 'JSX DOM Elements',
      },
      {
        href: '/components',
        children: 'Components',
      },
      {
        href: '/state-management',
        children: 'State Management',
      },
    ],
  },
  {
    title: 'Components',
    children: [
      {
        href: '/portal',
        children: '<Portal>',
      },
      {
        href: '/show',
        children: '<Show>',
      },
      {
        href: '/hide',
        children: '<Hide>',
      },
      {
        href: '/for',
        children: '<For>',
      },
      {
        href: '/router',
        children: '<Router>',
      },
      {
        href: '/delay',
        children: '<Delay>',
      },
    ],
  },
  {
    title: 'Hooks',
    children: [
      {
        href: '/use-param',
        children: 'useParam',
      },
      {
        href: '/use-params',
        children: 'useParams',
      },
      {
        href: '/use-styles',
        children: 'useStyles',
      },
    ],
  },
  {
    title: 'Utils',
    children: [
      {
        href: '/ref',
        children: 'Ref',
      },
      {
        href: '/context',
        children: 'Context',
      },
    ],
  },
]
