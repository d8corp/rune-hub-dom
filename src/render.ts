import { Slot } from 'rune-hub'

import { parentContext } from './constants'
import { useOnce } from './hooks'
import type { HTMLProps, JSXElement } from './types'
import { JSXNode } from './types'
import { append, Context } from './utils'

Context.render = render

export function render (content: JSXElement) {
  if (content === undefined) return

  if (Array.isArray(content)) {
    content.forEach(render)

    return
  }

  if (content instanceof HTMLElement || content instanceof SVGElement || content instanceof Text || content instanceof Comment) {
    append(parentContext.get(), content)

    useOnce('clear', () => {
      content.remove()
    })

    return
  }

  if (content instanceof Slot) {
    const comment = document.createComment(content.rune.name)
    const context = Context.nest()
    parentContext.set(comment, context)
    render(comment)

    new Slot(Context.use(() => {
      render(content.value)
    }, context)).on()

    return
  }

  if (content instanceof JSXNode) {
    if (typeof content.type === 'string') {
      const element = document.createElement(content.type)

      render(element)

      for (const prop in content.props) {
        if (prop === 'children') continue

        if (prop.startsWith('on')) {
          // @ts-expect-error TODO: Check it
          element[prop] = content.props[prop]
        } else {
          const value = content.props[prop]

          if (typeof value === 'function') {
            new Slot(() => {
              element.setAttribute(prop, value())
            }).on()

            continue
          }

          if (value instanceof Slot) {
            new Slot(() => {
              element.setAttribute(prop, value.value)
            }).on()
          } else {
            element.setAttribute(prop, String(value))
          }
        }
      }

      if ('children' in content.props) {
        const context = Context.nest()
        parentContext.set(element, context)
        Context.use(render, context)(content.props.children)
      }

      return
    }

    if (typeof content.type === 'function') {
      render(content.type(content.props))

      return
    }

    if (content.type === undefined && 'children' in content.props) {
      render(content.props.children)
    }

    return
  }

  if (typeof content === 'function') {
    render(new Slot(content))

    return
  }

  if (typeof content === 'string' || typeof content === 'number') {
    render(document.createTextNode(String(content)))
  }
}

declare global {
  namespace JSX {
    type Element = JSXElement

    interface ElementChildrenAttribute {
      // eslint-disable-next-line @typescript-eslint/no-empty-object-type
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
