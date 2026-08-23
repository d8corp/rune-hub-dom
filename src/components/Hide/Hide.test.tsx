import { Slot } from 'rune-hub'

import { Hide } from './Hide'

import { useOnce } from '../../hooks'
import { render } from '../../render'
import { getHTML } from '../../utils'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('Hide', () => {
  it('should render with a state', () => {
    const hide = new Slot(() => false)

    render(
      <Hide when={hide}>
        Shown
      </Hide>,
    )

    expect(getHTML()).toBe('Shown')

    hide.value = true

    expect(getHTML()).toBe('')
  })

  it('should render with a cache', () => {
    const hide1 = new Slot(() => false)
    const hide2 = new Slot(() => false)
    const hide = new Slot(() => hide1.value && hide2.value)

    render(
      <Hide when={hide}>
        Shown
      </Hide>,
    )

    expect(getHTML()).toBe('Shown')

    hide1.value = true

    expect(getHTML()).toBe('Shown')

    hide2.value = true

    expect(getHTML()).toBe('')
  })

  it('should render with a function of state', () => {
    const hide = new Slot(() => false)

    render(
      <Hide when={() => hide.value}>
        Shown
      </Hide>,
    )

    expect(getHTML()).toBe('Shown')

    hide.value = true

    expect(getHTML()).toBe('')
  })

  it('should destroy content', () => {
    const fn = jest.fn()
    const hide = new Slot(() => false)

    function Test () {
      useOnce('clear', fn)

      return 'test'
    }

    render(
      <Hide when={hide}>
        <Test />
      </Hide>,
    )

    expect(fn).not.toHaveBeenCalled()

    hide.value = true

    expect(fn).toHaveBeenCalled()
  })

  it('should render fallback', () => {
    const hide = new Slot(() => false)

    render(
      <Hide when={hide} fallback='Hide'>
        Show
      </Hide>,
    )

    expect(getHTML()).toBe('Show')

    hide.value = true

    expect(getHTML()).toBe('Hide')
  })
})
