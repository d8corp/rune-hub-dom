import { Slot } from 'rune-hub'

import { parentContext } from './constants'
import { useOnce } from './hooks'
import type { HTMLProps, JSXElement } from './types'
import { JSXNode } from './types'
import { append, Content, Context, remove, use } from './utils'

Context.render = render

export function render (target: JSXElement) {
  if (target === undefined) return

  if (Array.isArray(target)) {
    target.forEach(render)

    return
  }

  if (target instanceof HTMLElement || target instanceof SVGElement || target instanceof Text || target instanceof Content) {
    append(parentContext.get(), target)

    useOnce('clear', () => {
      remove(target)
    })

    return
  }

  if (target instanceof Slot) {
    const content = new Content()
    const context = Context.nest()
    parentContext.set(content, context)
    render(content)

    new Slot(Context.use(() => {
      render(target.value)
    }, context)).on()

    return
  }

  if (target instanceof JSXNode) {
    if (typeof target.type === 'string') {
      const element = document.createElement(target.type)

      render(element)

      for (const prop in target.props) {
        if (prop === 'children') continue

        if (prop.startsWith('on')) {
          // @ts-expect-error TODO: Check it
          element[prop] = target.props[prop]
          continue
        }

        const value = target.props[prop]

        if (value instanceof Slot || typeof value === 'function') {
          new Slot(() => {
            const result = use(value)

            if (result === undefined || result === '') {
              element.removeAttribute(prop)
            } else {
              element.setAttribute(prop, String(result))
            }
          }).on()

          continue
        }

        if (value !== undefined && value !== '') {
          element.setAttribute(prop, String(value))
        }
      }

      if ('children' in target.props) {
        const context = Context.nest()
        parentContext.set(element, context)
        Context.use(render, context)(target.props.children)
      }

      return
    }

    if (typeof target.type === 'function') {
      render(target.type(target.props))

      return
    }

    if (target.type === undefined && 'children' in target.props) {
      render(target.props.children)
    }

    return
  }

  if (typeof target === 'function') {
    render(new Slot(target))

    return
  }

  if (typeof target === 'string' || typeof target === 'number') {
    render(document.createTextNode(String(target)))
  }
}

declare global {
  namespace JSX {
    type Element = JSXElement

    interface ElementChildrenAttribute {

      children: {}
    }

    type IntrinsicElements = {
      [K in keyof HTMLElementTagNameMap]: HTMLProps<HTMLElementTagNameMap[K]>
    } & {
      [K in Exclude<keyof SVGElementTagNameMap, 'a'>]: HTMLProps<SVGElementTagNameMap[K]>
    } & {
      svg: {
        xmlns?: string
        fill?: string
        stroke?: string
      },
      path: {
        d?: string
      }
    }
  }
}
