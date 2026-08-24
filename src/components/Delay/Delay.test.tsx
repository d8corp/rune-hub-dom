import { Slot } from 'rune-hub'

import { Show } from '../Show'

import { render } from '../../render'
import type { Component } from '../../types'
import { getHTML, Ref } from '../../utils'

import { Delay, useHidden } from '.'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('Delay', () => {
  it('should work as is, without props', () => {
    render(
      <Delay>
        works
      </Delay>,
    )

    expect(getHTML()).toBe('works')
  })

  it('should work', async () => {
    const show = new Slot(() => true)

    render(
      <Show when={show}>
        <Delay show={100} hide={100}>
          works
        </Delay>
      </Show>,
    )

    expect(getHTML()).toBe('')

    await new Promise(resolve => setTimeout(resolve, 100))

    expect(getHTML()).toBe('works')

    show.value = false

    expect(getHTML()).toBe('works')

    await new Promise(resolve => setTimeout(resolve, 100))

    expect(getHTML()).toBe('')
  })

  it('should set elements to the right place', async () => {
    render(
      <>
        before
        <Delay show={100}>
          works
        </Delay>
        after
      </>,
    )

    expect(getHTML()).toBe('beforeafter')

    await new Promise(resolve => setTimeout(resolve, 100))

    expect(getHTML()).toBe('beforeworksafter')
  })

  it('should set elements to the right place with hide', async () => {
    const show = new Slot(() => true)

    render(
      <Show when={show}>
        before
        <Delay show={100} hide={100}>
          works
        </Delay>
        after
      </Show>,
    )

    expect(getHTML()).toBe('beforeafter')

    await new Promise(resolve => setTimeout(resolve, 100))

    expect(getHTML()).toBe('beforeworksafter')

    show.value = false

    expect(getHTML()).toBe('works')

    await new Promise(resolve => setTimeout(resolve, 100))

    expect(getHTML()).toBe('')
  })

  it('should work with context', async () => {
    const Component: Component = () => {
      const hidden = useHidden()

      return (
        <div class={() => hidden?.value ? 'hidden' : 'shown'} />
      )
    }

    const show = new Slot(() => true)

    render(
      <Show when={show}>
        <Delay hide={100}>
          <Component />
        </Delay>
      </Show>,
    )

    expect(getHTML()).toBe('<div class="shown"></div>')

    await new Promise(resolve => setTimeout(resolve, 100))

    expect(getHTML()).toBe('<div class="shown"></div>')

    show.value = false

    expect(getHTML()).toBe('<div class="hidden"></div>')

    await new Promise(resolve => setTimeout(resolve, 50))

    expect(getHTML()).toBe('<div class="hidden"></div>')

    await new Promise(resolve => setTimeout(resolve, 50))

    expect(getHTML()).toBe('')
  })

  it('should work with context and show', async () => {
    const Component: Component = () => {
      const hidden = useHidden()

      return (
        <div class={() => hidden?.value ? 'hidden' : 'shown'} />
      )
    }

    const show = new Slot(() => true)

    render(
      <Show when={show}>
        <Delay show={100} hide={100}>
          <Component />
        </Delay>
      </Show>,
    )

    expect(getHTML()).toBe('')

    await new Promise(resolve => setTimeout(resolve, 105))

    expect(getHTML()).toBe('<div class="shown"></div>')

    show.value = false

    expect(getHTML()).toBe('<div class="hidden"></div>')

    await new Promise(resolve => setTimeout(resolve, 50))

    expect(getHTML()).toBe('<div class="hidden"></div>')

    await new Promise(resolve => setTimeout(resolve, 50))

    expect(getHTML()).toBe('')
  })

  it('should work with ref', async () => {
    const Component: Component = () => {
      const hidden = new Ref<Slot<boolean>>()

      return (
        <Delay ref={hidden} hide={100}>
          <div class={() => hidden.value?.value ? 'hidden' : 'shown'} />
        </Delay>
      )
    }

    const show = new Slot(() => true)

    render(
      <Show when={show}>
        <Component />
      </Show>,
    )

    expect(getHTML()).toBe('<div class="shown"></div>')

    show.value = false

    expect(getHTML()).toBe('<div class="hidden"></div>')

    await new Promise(resolve => setTimeout(resolve, 50))

    expect(getHTML()).toBe('<div class="hidden"></div>')

    await new Promise(resolve => setTimeout(resolve, 50))

    expect(getHTML()).toBe('')
  })

  it('should work deep', async () => {
    render(
      <Delay show={100}>
        Works
        <Delay show={100}>fine!</Delay>
      </Delay>,
    )

    expect(getHTML()).toBe('')

    await new Promise(resolve => setTimeout(resolve, 100))

    expect(getHTML()).toBe('Works')

    await new Promise(resolve => setTimeout(resolve, 100))

    expect(getHTML()).toBe('Worksfine!')
  })

  it('should works inside each other', async () => {
    const show = new Slot(() => true)

    function Test () {
      const hidden = new Ref<Slot<boolean>>()

      const text = new Slot(() => {
        // console.log(String(hidden.value?.value))

        return String(hidden.value?.value)
      })

      return (
        <Show when={show}>
          <Delay show={300}>
            hidden:
            <Delay ref={hidden} hide={300}>
              {text}
            </Delay>
          </Delay>
        </Show>
      )
    }

    render(<Test />)

    expect(getHTML()).toBe('')

    await new Promise(resolve => setTimeout(resolve, 150))

    expect(getHTML()).toBe('')

    await new Promise(resolve => setTimeout(resolve, 150))

    expect(getHTML()).toBe('hidden:false')

    show.value = false

    expect(getHTML()).toBe('true')

    await new Promise(resolve => setTimeout(resolve, 150))

    expect(getHTML()).toBe('true')

    await new Promise(resolve => setTimeout(resolve, 150))

    expect(getHTML()).toBe('')
  })

  it('should have not comment for hide', async () => {
    render(
      <Delay hide={300}>
        Content
      </Delay>,
    )

    expect(document.body.innerHTML).toBe('Content')
  })
})
