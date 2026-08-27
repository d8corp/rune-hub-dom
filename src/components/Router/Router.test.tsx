import { Slot } from 'rune-hub'

import { Router } from './Router'

import { render } from '../../render'
import type { ChildrenProps, JSXElement } from '../../types'
import { lazy, pushHistory } from '../../utils'

import { createRouting, useParam } from '.'

afterEach(() => {
  pushHistory('/')
})

const Home = () => 'Home'
const NotFound = () => '404'
const About = () => 'About'
const Settings = () => 'Settings'
const Prelogin = () => 'Prelogin'
const Foo = () => 'Foo'
const Bar = () => 'Bar'
const FooBar = () => 'FooBar'

const MainLayout = (props: ChildrenProps) => <div>{props.children}</div>
const SecondLayout = (props: ChildrenProps) => <span>{props.children}</span>

const renderTest = (content: JSXElement) => {
  return new Slot(() => render(content)).on()
}

describe('Router', () => {
  describe('main', () => {
    it('Should render correctly', () => {
      const routing = createRouting([])

      const stop = renderTest(<Router routing={routing} />)

      expect(document.body.innerHTML).toBe('')

      stop()
    })

    it('Should render home page', () => {
      const routing = createRouting([
        { index: true, component: Home },
      ])

      const stop = renderTest(<Router routing={routing} />)

      expect(document.body.innerHTML).toBe('Home')

      pushHistory('/test')

      expect(document.body.innerHTML).toBe('')

      stop()
    })

    it('Should render 404 page', () => {
      const routing = createRouting([
        { index: true, component: Home },
        { component: NotFound },
      ])

      const stop = renderTest(<Router routing={routing} />)

      expect(document.body.innerHTML).toBe('Home')

      pushHistory('/test')

      expect(document.body.innerHTML).toBe('404')

      stop()
    })

    it('Should render about page', () => {
      const routing = createRouting([
        { index: true, component: Home },
        { path: 'about', component: About },
        { component: NotFound },
      ])

      const stop = renderTest(<Router routing={routing} />)

      expect(document.body.innerHTML).toBe('Home')

      pushHistory('/about')

      expect(document.body.innerHTML).toBe('About')

      pushHistory('/about/foo')

      expect(document.body.innerHTML).toBe('About')

      stop()
    })

    it('Should render index about page', () => {
      pushHistory('/')

      const routing = createRouting([
        { index: true, component: Home },
        { index: true, path: 'about', component: About },
        { component: NotFound },
      ])

      const stop = renderTest(<Router routing={routing} />)

      expect(document.body.innerHTML).toBe('Home')

      pushHistory('/about')

      expect(document.body.innerHTML).toBe('About')

      pushHistory('/about/foo')

      expect(document.body.innerHTML).toBe('404')

      stop()
    })

    it('Should render layout', () => {
      pushHistory('/')

      const routing = createRouting([
        {
          component: MainLayout,
          children: [
            { index: true, component: Home },
            { index: true, path: 'about', component: About },
            { component: NotFound },
          ],
        },
        {
          component: SecondLayout,
          children: [
            { index: true, path: 'settings', component: Settings },
          ],
        },
      ])

      const stop = renderTest(<Router routing={routing} />)

      expect(document.body.innerHTML).toBe('<div>Home</div>')

      pushHistory('/about')

      expect(document.body.innerHTML).toBe('<div>About</div>')

      pushHistory('/settings')

      expect(document.body.innerHTML).toBe('<span>Settings</span>')

      stop()
    })

    it('Should render list of segments', () => {
      pushHistory('/')

      const routing = createRouting([
        { index: true, component: Home },
        { path: 'foo|bar', component: FooBar },
        { component: NotFound },
      ])

      const stop = renderTest(<Router routing={routing} />)

      expect(document.body.innerHTML).toBe('Home')

      pushHistory('/foo')

      expect(document.body.innerHTML).toBe('FooBar')

      pushHistory('/bar')

      expect(document.body.innerHTML).toBe('FooBar')

      pushHistory('/baz')

      expect(document.body.innerHTML).toBe('404')

      stop()
    })

    it('Should render optional segment', () => {
      pushHistory('/')

      const Settings = ({ children }: ChildrenProps) => <div>{children}</div>
      const MainTab = () => 'Main Tab'
      const AccountTab = () => 'Account Tab'
      const NotificationsTab = () => 'Notifications Tab'
      const NotFound = () => 'NotFound Page'

      const routing = createRouting([
        { index: true, component: Home },
        {
          path: 'settings',
          component: Settings,
          children: [
            { index: true, path: 'main?', component: MainTab },
            { index: true, path: 'account', component: AccountTab },
            { index: true, path: 'notifications', component: NotificationsTab },
          ],
        },
        { component: NotFound },
      ])

      const stop = renderTest(<Router routing={routing} />)

      expect(document.body.innerHTML).toBe('Home')

      pushHistory('/settings')

      expect(document.body.innerHTML).toBe('<div>Main Tab</div>')

      pushHistory('/settings/main')

      expect(document.body.innerHTML).toBe('<div>Main Tab</div>')

      pushHistory('/settings/account')

      expect(document.body.innerHTML).toBe('<div>Account Tab</div>')

      pushHistory('/settings/notifications')

      expect(document.body.innerHTML).toBe('<div>Notifications Tab</div>')

      pushHistory('/settings/foo')

      expect(document.body.innerHTML).toBe('NotFound Page')

      pushHistory('/foo')

      expect(document.body.innerHTML).toBe('NotFound Page')

      stop()
    })

    it('Should work with permissions', () => {
      pushHistory('/')

      const permissions = new Slot(() => new Set<string>())

      const routing = createRouting([
        {
          component: MainLayout,
          children: [
            { index: true, component: Home },
            { index: true, path: 'about', component: About },
            { component: NotFound },
          ],
        },
        {
          component: SecondLayout,
          permissions: ['postlogin'],
          children: [
            { index: true, path: 'settings', component: Settings },
          ],
        },
      ])

      const stop = renderTest(<Router routing={routing} permissions={permissions} />)

      expect(document.body.innerHTML).toBe('<div>Home</div>')

      pushHistory('/about')

      expect(document.body.innerHTML).toBe('<div>About</div>')

      pushHistory('/settings')

      expect(document.body.innerHTML).toBe('<div>404</div>')

      permissions.value.add('postlogin')
      permissions.update()

      expect(document.body.innerHTML).toBe('<span>Settings</span>')

      permissions.value.delete('postlogin')
      permissions.update()

      expect(document.body.innerHTML).toBe('<div>404</div>')

      stop()
    })

    it('Should work with different pages for different permissions', () => {
      pushHistory('/')

      const permissions = new Slot(() => new Set<string>())

      const routing = createRouting([
        {
          index: true,
          component: Prelogin,
        },
        {
          component: MainLayout,
          children: [
            { index: true, path: 'about', component: About },
            {
              permissions: ['postlogin'],
              children: [
                { index: true, component: Home },
                { index: true, path: 'settings', component: Settings },
              ],
            },
            { component: NotFound },
          ],
        },
      ])

      const stop = renderTest(<Router routing={routing} permissions={permissions} />)

      expect(document.body.innerHTML).toBe('Prelogin')

      pushHistory('/about')

      expect(document.body.innerHTML).toBe('<div>About</div>')

      pushHistory('/settings')

      expect(document.body.innerHTML).toBe('<div>404</div>')

      permissions.value.add('postlogin')
      permissions.update()

      expect(document.body.innerHTML).toBe('<div>Settings</div>')

      pushHistory('/')

      expect(document.body.innerHTML).toBe('<div>Home</div>')

      permissions.value.delete('postlogin')
      permissions.update()

      expect(document.body.innerHTML).toBe('Prelogin')

      stop()
    })
  })

  describe('lazy', () => {
    it('Should render home page', async () => {
      pushHistory('/')

      const routing = createRouting([
        { index: true, component: lazy(async () => Home) },
      ])

      const stop = renderTest(<Router routing={routing} />)

      await new Promise(resolve => setTimeout(resolve))

      expect(document.body.innerHTML).toBe('Home')

      pushHistory('/test')

      expect(document.body.innerHTML).toBe('')

      stop()
    })

    it('Should render fallback', async () => {
      pushHistory('/')

      const routing = createRouting([
        {
          index: true,
          component: lazy(async () => Home),
          fallback: 'Loading...',
        },
      ])

      const stop = renderTest(<Router routing={routing} />)

      expect(document.body.innerHTML).toBe('Loading...')

      await new Promise(resolve => setTimeout(resolve))

      expect(document.body.innerHTML).toBe('Home')

      pushHistory('/test')

      expect(document.body.innerHTML).toBe('')

      stop()
    })

    it('Should render lazy deep', async () => {
      pushHistory('/')

      const routing = createRouting([
        {
          component: lazy(async () => {
            new Promise(resolve => setTimeout(resolve, 300))

            return MainLayout
          }),
          fallback: 'Loading MainLayout...',
          children: [
            {
              index: true,
              component: lazy(async () => {
                new Promise(resolve => setTimeout(resolve, 300))

                return Home
              }),
              fallback: 'Loading Home...',
            },
            {
              component: lazy(async () => {
                await new Promise(resolve => setTimeout(resolve, 300))

                return NotFound
              }),
              fallback: 'Loading NotFound...',
            },
          ],
        },
      ])

      const stop = renderTest(<Router routing={routing} />)

      expect(document.body.innerHTML).toBe('Loading MainLayout...')

      await new Promise(resolve => setTimeout(resolve, 300))

      expect(document.body.innerHTML).toBe('<div>Home</div>')

      pushHistory('/test')

      expect(document.body.innerHTML).toBe('<div>Loading NotFound...</div>')

      await new Promise(resolve => setTimeout(resolve, 300))

      expect(document.body.innerHTML).toBe('<div>404</div>')

      pushHistory('/')

      expect(document.body.innerHTML).toBe('<div>Home</div>')

      pushHistory('/test')

      expect(document.body.innerHTML).toBe('<div>404</div>')

      stop()
    })

    it('Should work with default', async () => {
      pushHistory('/')

      const routing = createRouting([
        {
          index: true,
          component: lazy(async () => ({ default: Home })),
          fallback: 'Loading...',
        },
      ])

      const stop = renderTest(<Router routing={routing} />)

      expect(document.body.innerHTML).toBe('Loading...')

      await new Promise(resolve => setTimeout(resolve))

      expect(document.body.innerHTML).toBe('Home')

      pushHistory('/test')

      expect(document.body.innerHTML).toBe('')

      stop()
    })
  })

  describe('children', () => {
    it('Should work with childrenFallback', async () => {
      pushHistory('/')

      const routing = createRouting([
        { index: true, component: Home },
        {
          childrenFallback: 'Loading...',
          children: [
            {
              index: true,
              path: 'foo',
              component: lazy(async () => {
                await new Promise(resolve => setTimeout(resolve))

                return Foo
              }),
            },
            {
              index: true,
              path: 'bar',
              component: lazy(async () => {
                await new Promise(resolve => setTimeout(resolve))

                return Bar
              }),
            },
          ],
        },
      ])

      const stop = renderTest(<Router routing={routing} />)

      expect(document.body.innerHTML).toBe('Home')

      pushHistory('/foo')

      expect(document.body.innerHTML).toBe('Loading...')

      await new Promise(resolve => setTimeout(resolve))

      expect(document.body.innerHTML).toBe('Foo')

      pushHistory('/bar')

      expect(document.body.innerHTML).toBe('Loading...')

      await new Promise(resolve => setTimeout(resolve))

      expect(document.body.innerHTML).toBe('Bar')

      stop()
    })
  })

  describe('optional path segment', () => {
    it('should work with strict params', () => {
      pushHistory('/')

      const Home = () => {
        const lang = useParam('lang')

        return <>Home: {lang}</>
      }

      const routing = createRouting([
        {
          path: ':lang[en|ru]?',
          children: [
            { index: true, component: Home },
            { index: true, path: 'about', component: About },
          ],
        },
        { component: NotFound },
      ])

      const stop = renderTest(<Router routing={routing} />)

      expect(document.body.innerHTML).toBe('Home: ')

      pushHistory('/en')

      expect(document.body.innerHTML).toBe('Home: en')

      pushHistory('/ru')

      expect(document.body.innerHTML).toBe('Home: ru')

      pushHistory('/about')

      expect(document.body.innerHTML).toBe('About')

      pushHistory('/en/about')

      expect(document.body.innerHTML).toBe('About')

      pushHistory('/ru/about')

      expect(document.body.innerHTML).toBe('About')

      pushHistory('/foo')

      expect(document.body.innerHTML).toBe('404')

      pushHistory('/en/foo')

      expect(document.body.innerHTML).toBe('404')

      stop()
    })
  })

  describe('params', () => {
    it('should provide params', () => {
      pushHistory('/')

      const UserPage = () => {
        const user = useParam('userId')

        return <div>User: {user}</div>
      }

      const routing = createRouting([
        { index: true, component: Home },
        { index: true, path: 'users/:userId', component: UserPage },
        { component: NotFound },
      ])

      const stop = renderTest(<Router routing={routing} />)

      expect(document.body.innerHTML).toBe('Home')

      pushHistory('/users/123')

      expect(document.body.innerHTML).toBe('<div>User: 123</div>')

      pushHistory('/users')

      expect(document.body.innerHTML).toBe('404')

      pushHistory('/users/123/321')

      expect(document.body.innerHTML).toBe('404')

      stop()
    })

    it('should work with optional params', () => {
      pushHistory('/')

      const UserPage = () => {
        const user = useParam('userId')

        return <div>User: {user}</div>
      }

      const routing = createRouting([
        { index: true, component: Home },
        { index: true, path: 'users/:userId?', component: UserPage },
        { component: NotFound },
      ])

      const stop = renderTest(<Router routing={routing} />)

      expect(document.body.innerHTML).toBe('Home')

      pushHistory('/users/123')

      expect(document.body.innerHTML).toBe('<div>User: 123</div>')

      pushHistory('/users')

      expect(document.body.innerHTML).toBe('<div>User: </div>')

      pushHistory('/users/foo/bar')

      expect(document.body.innerHTML).toBe('404')

      stop()
    })
  })
})
