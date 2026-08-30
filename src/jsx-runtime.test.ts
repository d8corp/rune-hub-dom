import { Slot } from 'rune-hub'

import { jsx } from './jsx-runtime'

import { rundom } from '.'

describe('jsx', () => {
  describe('HTML Element', () => {
    it('renders without crashing', () => {
      const app = new Slot(() => rundom(jsx('div', {})))
      expect(document.body.innerHTML).toBe('')
      app.on()
      expect(document.body.innerHTML).toBe('<div></div>')
      app.off()
      expect(document.body.innerHTML).toBe('')
    })

    it('renders with attribute props', () => {
      const app = new Slot(() => rundom(jsx('div', { id: 'app' })))
      expect(document.body.innerHTML).toBe('')
      app.on()
      expect(document.body.innerHTML).toBe('<div id="app"></div>')
      app.off()
      expect(document.body.innerHTML).toBe('')
    })

    it('renders with dynamic attribute props', () => {
      const id = new Slot(() => 'app')
      const app = new Slot(() => rundom(jsx('div', { id, class: () => id.value })))
      expect(document.body.innerHTML).toBe('')
      app.on()
      expect(document.body.innerHTML).toBe('<div id="app" class="app"></div>')
      id.set('foo')
      expect(document.body.innerHTML).toBe('<div id="foo" class="foo"></div>')
      app.off()
      expect(document.body.innerHTML).toBe('')
    })

    it('renders with event props', () => {
      const log: number[] = []

      const app = new Slot(() => rundom(jsx('button', { id: 'app', onclick: () => log.push(0) })))
      expect(document.body.innerHTML).toBe('')
      app.on()
      expect(document.body.innerHTML).toBe('<button id="app"></button>')
      expect(log).toEqual([])

      document.getElementById('app')?.click()
      expect(log).toEqual([0])

      document.getElementById('app')?.click()
      expect(log).toEqual([0, 0])

      app.off()
      expect(document.body.innerHTML).toBe('')
    })

    it('renders with children props', () => {
      const app = new Slot(() => rundom(jsx('div', { children: ['Hello World!'] })))

      expect(document.body.innerHTML).toBe('')
      app.on()
      expect(document.body.innerHTML).toBe('<div>Hello World!</div>')

      app.off()
      expect(document.body.innerHTML).toBe('')
    })

    it('renders with dynamic children', () => {
      const count = new Slot(function count () { return 0 })
      const app = new Slot(() => rundom(jsx('div', { children: ['Count: ', count] })))

      expect(document.body.innerHTML).toBe('')
      app.on()
      expect(document.body.innerHTML).toBe('<div>Count: 0</div>')

      count.value++
      expect(document.body.innerHTML).toBe('<div>Count: 1</div>')

      count.value++
      expect(document.body.innerHTML).toBe('<div>Count: 2</div>')

      app.off()
      expect(document.body.innerHTML).toBe('')
    })
  })
})
