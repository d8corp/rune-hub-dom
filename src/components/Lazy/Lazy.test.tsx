import { Slot } from 'rune-hub'

import { Lazy } from './Lazy'

import { rundom } from '../../rundom'
import { lazy } from '../../utils'

afterEach(() => { document.body.innerHTML = '' })

const Foo = () => <div>Foo</div>
const Bar = () => <div>Bar</div>

describe('Lazy', () => {
  it('should render sync value', () => {
    rundom(<Lazy component={() => Foo} />)
    expect(document.body.innerHTML).toBe('<div>Foo</div>')
  })

  it('should render dynamic value', () => {
    const slot = new Slot(() => Foo)
    rundom(<Lazy component={slot} />)
    expect(document.body.innerHTML).toBe('<div>Foo</div>')

    slot.set(Bar)
    expect(document.body.innerHTML).toBe('<div>Bar</div>')
  })

  it('should render async value', async () => {
    const promise = Promise.resolve({ default: Foo })

    rundom(<Lazy component={() => promise} />)
    expect(document.body.innerHTML).toBe('')

    await new Promise(resolve => setTimeout(resolve, 100))
    expect(document.body.innerHTML).toBe('<div>Foo</div>')
  })

  it('should render lazy value', async () => {
    rundom(<Lazy component={lazy(() => Promise.resolve({ default: Foo }))} />)
    expect(document.body.innerHTML).toBe('')

    await new Promise(resolve => setTimeout(resolve, 100))
    expect(document.body.innerHTML).toBe('<div>Foo</div>')
  })

  it('should render fallback value', async () => {
    rundom(<Lazy fallback={<Bar />} component={lazy(() => Promise.resolve({ default: Foo }))} />)
    expect(document.body.innerHTML).toBe('<div>Bar</div>')

    await new Promise(resolve => setTimeout(resolve, 100))
    expect(document.body.innerHTML).toBe('<div>Foo</div>')
  })

  it('should render sync and async value', async () => {
    const promise = Promise.resolve({ default: Foo })
    const slot = new Slot<any>(() => promise)

    rundom(<Lazy component={slot} />)
    expect(document.body.innerHTML).toBe('')

    await new Promise(resolve => setTimeout(resolve, 100))
    expect(document.body.innerHTML).toBe('<div>Foo</div>')

    slot.set(Bar)
    expect(document.body.innerHTML).toBe('<div>Bar</div>')

    slot.set(promise)
    expect(document.body.innerHTML).toBe('<div>Foo</div>')
  })
})
