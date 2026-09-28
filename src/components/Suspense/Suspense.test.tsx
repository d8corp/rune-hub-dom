import { set, slot } from 'rune-hub'

import { Show } from '../Show'
import { Suspense } from './Suspense'

import { rundom } from '../../rundom'
import type { SimpleJSXElement } from '../../types'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('Suspense', () => {
  it('should render without fallback', async () => {
    const { promise, resolve } = Promise.withResolvers<SimpleJSXElement>()

    rundom(<Suspense>{promise}</Suspense>)
    expect(document.body.innerHTML).toBe('')

    resolve('Works')

    await new Promise(resolve => setTimeout(resolve))

    expect(document.body.innerHTML).toBe('Works')
  })

  it('should render with fallback', async () => {
    const { promise, resolve } = Promise.withResolvers<SimpleJSXElement>()

    rundom(<Suspense fallback='Loading'>{promise}</Suspense>)

    expect(document.body.innerHTML).toBe('Loading')

    resolve('Works')

    await new Promise(resolve => setTimeout(resolve))

    expect(document.body.innerHTML).toBe('Works')
  })

  it('should work with async components', async () => {
    const App = async () => 'App'

    rundom(<Suspense fallback='Loading'><App /></Suspense>)

    expect(document.body.innerHTML).toBe('Loading')

    await new Promise(resolve => setTimeout(resolve))

    expect(document.body.innerHTML).toBe('App')
  })

  it('should work with nested async components', async () => {
    const Content = async () => 'Content'
    const App = async () => <>App:<Content /></>

    rundom(<Suspense fallback='Loading'><App /></Suspense>)

    expect(document.body.innerHTML).toBe('Loading')

    await new Promise(resolve => setTimeout(resolve))

    expect(document.body.innerHTML).toBe('App:Content')
  })

  it('should work with dynamic async components', async () => {
    const show = () => false
    const Content = async () => 'Content'
    const App = async () => <>App:<Show when={slot(show)}><Content /></Show>Works</>

    rundom(<Suspense fallback='Loading'><App /></Suspense>)

    expect(document.body.innerHTML).toBe('Loading')

    await new Promise(resolve => setTimeout(resolve))

    expect(document.body.innerHTML).toBe('App:Works')

    set(show, true)

    expect(document.body.innerHTML).toBe('Loading')

    await new Promise(resolve => setTimeout(resolve))

    expect(document.body.innerHTML).toBe('App:ContentWorks')
  })
})
