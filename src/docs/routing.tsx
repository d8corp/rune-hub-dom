import { createRouting } from '../components'
import { lazy } from '../utils'
import { MainLayout } from './layouts/MainLayout'
import { MenuLayout } from './layouts/MenuLayout'
import { menu } from './menu'
import { LoadingPage } from './pages/system/LoadingPage'
import { uiMenu } from './uiMenu'

export const routing = createRouting([
  {
    component: MainLayout,
    childrenFallback: <LoadingPage />,
    children: [
      {
        index: true,
        component: lazy(() => import('./pages/main/HomePage')),
      },
      {
        path: 'ui',
        index: true,
        component: lazy(() => import('./pages/ui/UIPage/UIPage')),
      },
      {
        path: 'ui',
        component: ({ children }) => <MenuLayout menu={uiMenu} children={children} />,
        children: [
          {
            index: true,
            path: 'introduction',
            component: lazy(() => import('./pages/ui/UIIntroductionPage')),
          },
          {
            index: true,
            path: 'typography',
            component: lazy(() => import('./pages/ui/TypographyPage')),
          },
          {
            index: true,
            path: 'link',
            component: lazy(() => import('./pages/ui/LinkPage')),
          },
          {
            index: true,
            path: 'markdown',
            component: lazy(() => import('./pages/ui/MarkdownPage')),
          },
          {
            index: true,
            path: 'button',
            component: lazy(() => import('./pages/ui/ButtonPage')),
          },
          {
            index: true,
            path: 'code',
            component: lazy(() => import('./pages/ui/CodePage')),
          },
          {
            index: true,
            path: 'divider',
            component: lazy(() => import('./pages/ui/DividerPage')),
          },
          {
            index: true,
            path: 'scrollbar',
            component: lazy(() => import('./pages/ui/ScrollbarPage')),
          },
          {
            index: true,
            path: 'dot',
            component: lazy(() => import('./pages/ui/DotPage')),
          },
          {
            index: true,
            path: 'flex',
            component: lazy(() => import('./pages/ui/FlexPage')),
          },
          {
            index: true,
            path: 'text',
            component: lazy(() => import('./pages/ui/TextPage')),
          },
        ],
      },
      {
        component: ({ children }) => <MenuLayout menu={menu} children={children} />,
        children: [
          {
            index: true,
            path: 'quick-start',
            component: lazy(() => import('./pages/main/QuickStartPage')),
          },
          {
            index: true,
            path: 'jsx-elements',
            component: lazy(() => import('./pages/main/JSXElementsPage')),
          },
          {
            index: true,
            path: 'jsx-dom-elements',
            component: lazy(() => import('./pages/main/JSXDOMElementsPage')),
          },
          {
            index: true,
            path: 'components',
            component: lazy(() => import('./pages/main/ComponentsPage')),
          },
          {
            index: true,
            path: 'state-management',
            component: lazy(() => import('./pages/main/StateManagementPage')),
          },
          {
            index: true,
            path: 'routing',
            component: lazy(() => import('./pages/main/RoutingPage')),
          },
          {
            index: true,
            path: 'portal',
            component: lazy(() => import('./pages/main/PortalPage')),
          },
          {
            index: true,
            path: 'context',
            component: lazy(() => import('./pages/main/ContextPage')),
          },
          {
            index: true,
            path: 'for',
            component: lazy(() => import('./pages/main/ForPage')),
          },
          {
            index: true,
            path: 'router',
            component: lazy(() => import('./pages/main/RouterPage')),
          },
          {
            index: true,
            path: 'delay',
            component: lazy(() => import('./pages/main/DelayPage')),
          },
          {
            index: true,
            path: 'show',
            component: lazy(() => import('./pages/main/ShowPage')),
          },
          {
            index: true,
            path: 'hide',
            component: lazy(() => import('./pages/main/HidePage')),
          },
          {
            index: true,
            path: 'suspense',
            component: lazy(() => import('./pages/main/SuspensePage')),
          },
          {
            index: true,
            path: 'lazy',
            component: lazy(() => import('./pages/main/LazyPage')),
          },
          {
            index: true,
            path: 'use-param',
            component: lazy(() => import('./pages/main/UseParamPage')),
          },
          {
            index: true,
            path: 'use-params',
            component: lazy(() => import('./pages/main/UseParamsPage')),
          },
          {
            index: true,
            path: 'use-styles',
            component: lazy(() => import('./pages/main/UseStylesPage')),
          },
          {
            index: true,
            path: 'ref',
            component: lazy(() => import('./pages/main/RefPage')),
          },
        ],
      },
      {
        component: lazy(() => import('./pages/system/NotFoundPage')),
      },
    ],
  },
])
