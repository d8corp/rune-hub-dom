import { Slot } from 'rune-hub'

import { Show } from '../Show'
import { Portal } from './Portal'

import { render } from '../../render'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('Portal', () => {
  it('should work static', () => {
    const div = document.createElement('div')

    render(
      <Portal to={div}>
        works
      </Portal>,
    )

    expect(document.body.innerHTML).toBe('')
    expect(div.innerHTML).toBe('works')
  })

  it('should work dynamic', () => {
    const div = document.createElement('div')
    const show = new Slot(() => true)

    render(
      <Show when={show}>
        <Portal to={div}>
          works
        </Portal>
      </Show>,
    )

    expect(document.body.innerHTML).toBe('')
    expect(div.innerHTML).toBe('works')

    show.value = false

    expect(document.body.innerHTML).toBe('')
    expect(div.innerHTML).toBe('')

    show.value = true

    expect(document.body.innerHTML).toBe('')
    expect(div.innerHTML).toBe('works')
  })
})
