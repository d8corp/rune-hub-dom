import { createRouting } from '../components'
import { lazy } from '../utils'
import { BASE_URL } from './constants'
import { MainLayout } from './layouts/MainLayout'
import { MenuLayout } from './layouts/MenuLayout'
import { menu } from './menu'
import { LoadingPage } from './pages/system/LoadingPage'
import { uiMenu } from './uiMenu'

export const routing = createRouting([
  {
    path: BASE_URL,
    component: MainLayout,
    children: [
      {
        index: true,
        fallback: <LoadingPage />,
        component: lazy(() => import('./pages/main/HomePage')),
      },
      {
        path: 'ui',
        index: true,
        fallback: <LoadingPage />,
        component: lazy(() => import('./pages/ui/UIPage/UIPage')),
      },
      {
        path: 'ui',
        component: ({ children }) => <MenuLayout menu={uiMenu} children={children} />,
        children: [
          {
            index: true,
            path: 'introduction',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/ui/UIIntroductionPage')),
          },
          {
            index: true,
            path: 'link',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/ui/LinkPage')),
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
            component: lazy(() => import('./pages/main/QuickStartPage')),
          },
          {
            index: true,
            path: 'jsx-elements',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/main/JSXElementsPage')),
          },
          {
            index: true,
            path: 'jsx-dom-elements',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/main/JSXDOMElementsPage')),
          },
          {
            index: true,
            path: 'components',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/main/ComponentsPage')),
          },
          {
            index: true,
            path: 'state-management',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/main/StateManagementPage')),
          },
          {
            index: true,
            path: 'routing',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/main/RoutingPage')),
          },
          {
            index: true,
            path: 'portal',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/main/PortalPage')),
          },
          {
            index: true,
            path: 'context',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/main/ContextPage')),
          },
          {
            index: true,
            path: 'for',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/main/ForPage')),
          },
          {
            index: true,
            path: 'router',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/main/RouterPage')),
          },
          {
            index: true,
            path: 'delay',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/main/DelayPage')),
          },
          {
            index: true,
            path: 'show',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/main/ShowPage')),
          },
          {
            index: true,
            path: 'hide',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/main/HidePage')),
          },
          {
            index: true,
            path: 'use-param',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/main/UseParamPage')),
          },
          {
            index: true,
            path: 'use-params',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/main/UseParamsPage')),
          },
          {
            index: true,
            path: 'use-styles',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/main/UseStylesPage')),
          },
          {
            index: true,
            path: 'ref',
            fallback: <LoadingPage />,
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
