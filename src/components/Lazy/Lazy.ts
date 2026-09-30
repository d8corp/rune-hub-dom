import type { Slot } from 'rune-hub'

import type { Component, JSXTypeProps, ObservableProp, Reactive } from '../../types'
import { JSXNode } from '../../types'
import type { LazyResult } from '../../utils'
import { SystemSlot, use, viewTransition } from '../../utils'

export interface LazyProps<C extends Component = Component> {
  component: Reactive<LazyResult<C> | C> | Slot<LazyResult<C> | C>
  fallback?: JSX.Element
  show?: ObservableProp<boolean>
  render?: (Component: C) => JSX.Element
  cache?: Map<LazyResult, Component>
}

export function Lazy<C extends Component = Component> ({
  component,
  fallback,
  show = true,
  render = (component) => new JSXNode(component, {} as JSXTypeProps<C>),
  cache = new Map(),
}: LazyProps<C>) {
  if (!show) return

  const lazyLoading = () => false
  const loading = new SystemSlot(lazyLoading)

  const lazyLoadingEffect = () => {
    if (!use(show)) return

    const currentComponent = use(component)

    if (currentComponent instanceof Promise && !cache.has(currentComponent)) {
      loading.value = true

      currentComponent.then((component) => {
        cache.set(currentComponent, typeof component === 'function' ? component : component.default)

        viewTransition(() => {
          loading.set(false)
        })
      })
    }
  }

  new SystemSlot(lazyLoadingEffect).on()

  return () => {
    if (!use(show)) return null

    const currentComponent = use(component)

    if (typeof currentComponent === 'function') return render(currentComponent)

    const loadedComponent = cache.get(currentComponent) as C

    if (loadedComponent) {
      return render(loadedComponent)
    }

    if (loading.value) return fallback

    throw Error('Error in Lazy component. component has wrong result of promise.')
  }
}
