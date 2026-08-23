import { Slot } from 'rune-hub'

import { Show } from './Show'

import { useOnce } from '../../hooks'
import { jsx } from '../../jsx-runtime'
import { render } from '../../render'

function getHTML () {
  return document.body.innerHTML.replace('<!---->', '')
}

describe('Show', () => {
  it('should render with a state', () => {
    const show = new Slot(() => false)

    render(jsx(Show, { when: show, children: ['Shown'] }))
    expect(getHTML()).toBe('')
    show.value = true
    expect(getHTML()).toBe('Shown')
    document.body.innerHTML = ''
  })

  it('should render with a cache', () => {
    const show1 = new Slot(() => false)
    const show2 = new Slot(() => false)
    const show = new Slot(() => show1.value && show2.value)

    render(jsx(Show, { when: show, children: ['Shown'] }))

    expect(getHTML()).toBe('')

    show1.value = true

    expect(getHTML()).toBe('')

    show2.value = true

    expect(getHTML()).toBe('Shown')
    document.body.innerHTML = ''
  })

  it('should render with a function of state', () => {
    const show = new Slot(() => false)

    render(jsx(Show, { when: () => show.value, children: ['Shown'] }))

    expect(getHTML()).toBe('')

    show.value = true

    expect(getHTML()).toBe('Shown')
    document.body.innerHTML = ''
  })

  it('should destroy content', () => {
    const fn = jest.fn()
    const show = new Slot(() => true)

    function Test () {
      useOnce('clear', fn)

      return 'test'
    }

    render(jsx(Show, { when: show, children: [jsx(Test, {})] }))

    show.value = false
    expect(fn).toHaveBeenCalled()
    document.body.innerHTML = ''
  })

  it('should render fallback', () => {
    const show = new Slot(() => true)

    render(jsx(Show, { when: show, fallback: 'Hide', children: ['Show'] }))

    expect(getHTML()).toBe('Show')

    show.value = false

    expect(getHTML()).toBe('Hide')
    document.body.innerHTML = ''
  })
})
