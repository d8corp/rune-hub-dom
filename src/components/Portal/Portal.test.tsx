import { Slot } from 'rune-hub'

import { Show } from '../Show'
import { Portal } from './Portal'

import { render } from '../../render'
import { getHTML } from '../../utils'

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

    expect(getHTML()).toBe('')
    expect(getHTML(div)).toBe('works')
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

    expect(getHTML()).toBe('')
    expect(getHTML(div)).toBe('works')

    show.value = false

    expect(getHTML()).toBe('')
    expect(getHTML(div)).toBe('')

    show.value = true

    expect(getHTML()).toBe('')
    expect(getHTML(div)).toBe('works')
  })
})
