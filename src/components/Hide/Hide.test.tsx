import { Slot } from 'rune-hub'

import { Hide } from './Hide'

import { useClear } from '../../hooks'
import { rundom } from '../../rundom'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('Hide', () => {
  it('should render with a state', () => {
    const hide = new Slot(() => false)

    rundom(
      <Hide when={hide}>
        Shown
      </Hide>,
    )

    expect(document.body.innerHTML).toBe('Shown')

    hide.value = true

    expect(document.body.innerHTML).toBe('')
  })

  it('should render with a cache', () => {
    const hide1 = new Slot(() => false)
    const hide2 = new Slot(() => false)
    const hide = new Slot(() => hide1.value && hide2.value)

    rundom(
      <Hide when={hide}>
        Shown
      </Hide>,
    )

    expect(document.body.innerHTML).toBe('Shown')

    hide1.value = true

    expect(document.body.innerHTML).toBe('Shown')

    hide2.value = true

    expect(document.body.innerHTML).toBe('')
  })

  it('should render with a function of state', () => {
    const hide = new Slot(() => false)

    rundom(
      <Hide when={() => hide.value}>
        Shown
      </Hide>,
    )

    expect(document.body.innerHTML).toBe('Shown')

    hide.value = true

    expect(document.body.innerHTML).toBe('')
  })

  it('should destroy content', () => {
    const fn = jest.fn()
    const hide = new Slot(() => false)

    function Test () {
      useClear(fn)

      return 'test'
    }

    rundom(
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

    rundom(
      <Hide when={hide} fallback='Hide'>
        Show
      </Hide>,
    )

    expect(document.body.innerHTML).toBe('Show')

    hide.value = true

    expect(document.body.innerHTML).toBe('Hide')
  })
})
