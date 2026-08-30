import { Slot } from 'rune-hub'

import { Show } from '../Show'

import { rundom } from '../../rundom'
import type { Component } from '../../types'
import { Ref } from '../../utils'

import { Delay, useHidden } from '.'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('Delay', () => {
  it('should work as is, without props', () => {
    rundom(
      <Delay>
        works
      </Delay>,
    )

    expect(document.body.innerHTML).toBe('works')
  })

  it('should work', async () => {
    const show = new Slot(() => true)

    rundom(
      <Show when={show}>
        <Delay show={100} hide={100}>
          works
        </Delay>
      </Show>,
    )

    expect(document.body.innerHTML).toBe('')

    await new Promise(resolve => setTimeout(resolve, 100))

    expect(document.body.innerHTML).toBe('works')

    show.value = false

    expect(document.body.innerHTML).toBe('works')

    await new Promise(resolve => setTimeout(resolve, 100))

    expect(document.body.innerHTML).toBe('')
  })

  it('should set elements to the right place', async () => {
    rundom(
      <>
        before
        <Delay show={100}>
          works
        </Delay>
        after
      </>,
    )

    expect(document.body.innerHTML).toBe('beforeafter')

    await new Promise(resolve => setTimeout(resolve, 100))

    expect(document.body.innerHTML).toBe('beforeworksafter')
  })

  it('should set elements to the right place with hide', async () => {
    const show = new Slot(() => true)

    rundom(
      <Show when={show}>
        before
        <Delay show={100} hide={100}>
          works
        </Delay>
        after
      </Show>,
    )

    expect(document.body.innerHTML).toBe('beforeafter')

    await new Promise(resolve => setTimeout(resolve, 100))

    expect(document.body.innerHTML).toBe('beforeworksafter')

    show.value = false

    expect(document.body.innerHTML).toBe('works')

    await new Promise(resolve => setTimeout(resolve, 100))

    expect(document.body.innerHTML).toBe('')
  })

  it('should work with context', async () => {
    const Component: Component = () => {
      const hidden = useHidden()

      return (
        <div class={() => hidden?.value ? 'hidden' : 'shown'} />
      )
    }

    const show = new Slot(() => true)

    rundom(
      <Show when={show}>
        <Delay hide={100}>
          <Component />
        </Delay>
      </Show>,
    )

    expect(document.body.innerHTML).toBe('<div class="shown"></div>')

    await new Promise(resolve => setTimeout(resolve, 100))

    expect(document.body.innerHTML).toBe('<div class="shown"></div>')

    show.value = false

    expect(document.body.innerHTML).toBe('<div class="hidden"></div>')

    await new Promise(resolve => setTimeout(resolve, 50))

    expect(document.body.innerHTML).toBe('<div class="hidden"></div>')

    await new Promise(resolve => setTimeout(resolve, 50))

    expect(document.body.innerHTML).toBe('')
  })

  it('should work with context and show', async () => {
    const Component: Component = () => {
      const hidden = useHidden()

      return (
        <div class={() => hidden?.value ? 'hidden' : 'shown'} />
      )
    }

    const show = new Slot(() => true)

    rundom(
      <Show when={show}>
        <Delay show={100} hide={100}>
          <Component />
        </Delay>
      </Show>,
    )

    expect(document.body.innerHTML).toBe('')

    await new Promise(resolve => setTimeout(resolve, 105))

    expect(document.body.innerHTML).toBe('<div class="shown"></div>')

    show.value = false

    expect(document.body.innerHTML).toBe('<div class="hidden"></div>')

    await new Promise(resolve => setTimeout(resolve, 50))

    expect(document.body.innerHTML).toBe('<div class="hidden"></div>')

    await new Promise(resolve => setTimeout(resolve, 50))

    expect(document.body.innerHTML).toBe('')
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

    rundom(
      <Show when={show}>
        <Component />
      </Show>,
    )

    expect(document.body.innerHTML).toBe('<div class="shown"></div>')

    show.value = false

    expect(document.body.innerHTML).toBe('<div class="hidden"></div>')

    await new Promise(resolve => setTimeout(resolve, 50))

    expect(document.body.innerHTML).toBe('<div class="hidden"></div>')

    await new Promise(resolve => setTimeout(resolve, 50))

    expect(document.body.innerHTML).toBe('')
  })

  it('should work deep', async () => {
    rundom(
      <Delay show={100}>
        Works
        <Delay show={100}>fine!</Delay>
      </Delay>,
    )

    expect(document.body.innerHTML).toBe('')

    await new Promise(resolve => setTimeout(resolve, 100))

    expect(document.body.innerHTML).toBe('Works')

    await new Promise(resolve => setTimeout(resolve, 100))

    expect(document.body.innerHTML).toBe('Worksfine!')
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

    rundom(<Test />)

    expect(document.body.innerHTML).toBe('')

    await new Promise(resolve => setTimeout(resolve, 150))

    expect(document.body.innerHTML).toBe('')

    await new Promise(resolve => setTimeout(resolve, 150))

    expect(document.body.innerHTML).toBe('hidden:false')

    show.value = false

    expect(document.body.innerHTML).toBe('true')

    await new Promise(resolve => setTimeout(resolve, 150))

    expect(document.body.innerHTML).toBe('true')

    await new Promise(resolve => setTimeout(resolve, 150))

    expect(document.body.innerHTML).toBe('')
  })

  it('should have not Content for hide', async () => {
    rundom(
      <Delay hide={300}>
        <div id='foo' />
      </Delay>,
    )

    expect(document.getElementById('foo')?._parent).toBe(document.body)
  })
})
