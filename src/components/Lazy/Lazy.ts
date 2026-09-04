import type { Rune } from 'rune-hub'
import { Hub, Slot } from 'rune-hub'

import type { Component, JSXTypeProps, ObservableProp } from '../../types'
import { JSXNode } from '../../types'
import type { LazyResult } from '../../utils'
import { use } from '../../utils'

export interface LazyProps<C extends Component = Component> {
  component: Rune<LazyResult<C> | C> | Slot<LazyResult<C> | C>
  fallback?: JSX.Element
  show?: ObservableProp<boolean>
  render?: (Component: C) => JSX.Element
  loadedComponents?: Map<LazyResult, Component>
}

export function Lazy<C extends Component = Component> ({
  component,
  fallback,
  show = true,
  render = (component) => new JSXNode(component, {} as JSXTypeProps<C>),
  loadedComponents = new Map(),
}: LazyProps<C>) {
  if (!show) return

  const loading = new Slot(() => false, Hub.cur, true)

  new Slot(() => {
    if (!use(show)) return

    const currentComponent = use(component)

    if (currentComponent instanceof Promise && !loadedComponents.has(currentComponent)) {
      loading.value = true

      currentComponent.then((component) => {
        loadedComponents.set(currentComponent, typeof component === 'function' ? component : component.default)
        loading.set(false)
      })
    }
  }, Hub.cur, true).on()

  return () => {
    if (!use(show)) return null

    const currentComponent = use(component)

    if (typeof currentComponent === 'function') return render(currentComponent)

    const loadedComponent = loadedComponents.get(currentComponent) as C

    if (loadedComponent) {
      return render(loadedComponent)
    }

    if (loading.value) return fallback

    throw Error('Error in Lazy component. component has wrong result of promise.')
  }
}
