import { Slot } from 'rune-hub'

import { Lazy } from '../Lazy'
import { Pipe } from '../Pipe'
import { findRoute } from './helpers/findRoute'
import { paramsContext } from './hooks'
import { type Routing } from './types'

import { type Component, JSXNode, type ObservableProp } from '../../types'
import { Context, isLazy, type LazyResult, locationPath, use } from '../../utils'

export interface RouterProps {
  routing: ObservableProp<Routing>
  permissions?: ObservableProp<Set<string>>
}

const EMPTY_SET = new Set<string>()

export function Router ({ routing, permissions = EMPTY_SET }: RouterProps) {
  const params = paramsContext.get() || new Slot<Record<string, string>>(() => ({}))

  const route = new Slot(() => {
    const newParams: Record<string, string> = {}
    const route = findRoute(use(routing), locationPath.value.split('/').filter(Boolean), newParams, use(permissions))
    params.value = newParams

    return route
  })

  const components = new Slot(() => {
    const routeValue = route.value
    if (!routeValue) return []

    const result: Array<Component | LazyResult> = []

    for (let i = 0; i < routeValue.components.length; i++) {
      const component = routeValue.components[i]
      result.push(isLazy(component) ? component() : component)
    }

    return result
  })

  const loadedComponents = new Map()

  return new JSXNode(Context.Provider, {
    for: paramsContext,
    set: params,
    children: new JSXNode(Pipe, {
      children: (children, index) => new JSXNode(Lazy, {
        component: new Slot(() => components.value[index]),
        fallback: new Slot(() => route.value?.fallback?.[index]),
        show: new Slot(() => components.value.length > index),
        render: (Component) => new JSXNode(Component, { children }),
        loadedComponents,
      }),
    }),
  })
}
