import { createRouting } from '../components'
import { lazy } from '../utils'
import { BASE_URL } from './constants'
import { MainLayout } from './layouts/MainLayout'
import { MenuLayout } from './layouts/MenuLayout'
import { menu } from './menu'
import { LoadingPage } from './pages/LoadingPage'
import { uiMenu } from './uiMenu'

export const routing = createRouting([
  {
    path: BASE_URL,
    component: MainLayout,
    children: [
      {
        index: true,
        fallback: <LoadingPage />,
        component: lazy(() => import('./pages/HomePage')),
      },
      {
        path: 'ui',
        fallback: <LoadingPage />,
        component: lazy(() => import('./pages/UIPage/UIPage')),
      },
      {
        component: ({ children }) => <MenuLayout menu={uiMenu} children={children} />,
        children: [
          {
            index: true,
            path: 'flex',
            // fallback: <LoadingPage />,
            component: () => 'Flex Page',
          },
        ],
      },
      {
        component: ({ children }) => <MenuLayout menu={menu} children={children} />,
        children: [
          {
            index: true,
            path: 'quick-start',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/QuickStartPage')),
          },
          {
            index: true,
            path: 'jsx-elements',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/JSXElementsPage')),
          },
          {
            index: true,
            path: 'jsx-dom-elements',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/JSXDOMElementsPage')),
          },
          {
            index: true,
            path: 'components',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/ComponentsPage')),
          },
          {
            index: true,
            path: 'state-management',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/StateManagementPage')),
          },
          {
            index: true,
            path: 'routing',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/RoutingPage')),
          },
          {
            index: true,
            path: 'portal',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/PortalPage')),
          },
          {
            index: true,
            path: 'context',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/ContextPage')),
          },
          {
            index: true,
            path: 'for',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/ForPage')),
          },
          {
            index: true,
            path: 'router',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/RouterPage')),
          },
          {
            index: true,
            path: 'link',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/LinkPage')),
          },
          {
            index: true,
            path: 'delay',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/DelayPage')),
          },
          {
            index: true,
            path: 'show',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/ShowPage')),
          },
          {
            index: true,
            path: 'hide',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/HidePage')),
          },
          {
            index: true,
            path: 'use-param',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/UseParamPage')),
          },
          {
            index: true,
            path: 'use-params',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/UseParamsPage')),
          },
          {
            index: true,
            path: 'use-styles',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/UseStylesPage')),
          },
          {
            index: true,
            path: 'ref',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/RefPage')),
          },
        ],
      },
      {
        component: lazy(() => import('./pages/NotFoundPage')),
      },
    ],
  },
])
