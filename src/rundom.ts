import { Hub, type Rune, Slot } from 'rune-hub'

import { parentContext } from './constants'
import { useClear } from './hooks'
import type { HTMLProps, JSXElement } from './types'
import { JSXNode } from './types'
import { append, Content, Context, observablePropToRuneProp, remove, use } from './utils'

Context.render = rundom

export const svgNamespaceContext = new Context<string>('')

export function runReactive (target: Slot<JSXElement> | Rune<JSXElement>) {
  const content = new Content()
  const context = Context.nest()
  parentContext.set(content, context)
  runElement(content)

  new Slot(() => Context.use(() => {
    rundom(use(target))
  }, context), Hub.cur, true).on()
}

export function runElement (target: HTMLElement | SVGElement | Text | Content) {
  append(parentContext.get(), target)
  useClear(() => remove(target))
}

export function runArray (target: JSXElement[]) {
  target.forEach(rundom)
}

export function runNode (target: JSXNode) {
  if (typeof target.type === 'string') {
    const element = svgNamespaceContext.get() || target.type === 'svg'
      ? document.createElementNS(svgNamespaceContext.get() || 'http://www.w3.org/2000/svg', target.type)
      : document.createElement(target.type)

    runElement(element)

    for (const prop in target.props) {
      if (prop === 'children') continue

      if (prop === 'ref') {
        if (target.props.ref) {
          target.props.ref.value = element
        }

        continue
      }

      if (prop.startsWith('on')) {
        // @ts-expect-error TODO: Check it
        element[prop] = target.props[prop]
        continue
      }

      const value = target.props[prop]

      if (prop === 'style') {
        for (const property in value) {
          const rawValue = observablePropToRuneProp(value[property])

          if (typeof rawValue === 'function') {
            new Slot(() => {
              element.style.setProperty(property, rawValue())
            }, Hub.cur, true).on()
          } else {
            element.style.setProperty(property, rawValue)
          }
        }

        continue
      }

      if (value instanceof Slot || typeof value === 'function') {
        new Slot(() => {
          const result = use(value)

          if (result === undefined || result === '') {
            element.removeAttribute(prop)
          } else {
            element.setAttribute(prop, String(result))
          }
        }, Hub.cur, true).on()

        continue
      }

      if (value !== undefined && value !== '') {
        element.setAttribute(prop, String(value))
      }
    }

    if ('children' in target.props) {
      const context = Context.nest()
      parentContext.set(element, context)

      if (target.type === 'svg') {
        svgNamespaceContext.set('http://www.w3.org/2000/svg', context)
      }

      Context.use(() => rundom(target.props.children), context)
    }

    return
  }

  if (typeof target.type === 'function') {
    rundom(target.type(target.props))

    return
  }

  if (target.type === undefined && 'children' in target.props) {
    rundom(target.props.children)
  }
}

export function rundom (target: JSXElement) {
  if (target === undefined) return

  if (Array.isArray(target)) {
    runArray(target)

    return
  }

  if (target instanceof HTMLElement || target instanceof SVGElement || target instanceof Text || target instanceof Content) {
    runElement(target)

    return
  }

  if (target instanceof JSXNode) {
    runNode(target)

    return
  }

  if (target instanceof Slot || typeof target === 'function') {
    runReactive(target)

    return
  }

  if (typeof target === 'string' || typeof target === 'number') {
    runElement(document.createTextNode(String(target)))
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
