import { Hub, Slot } from 'rune-hub'

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
  const params = paramsContext.get() || new Slot<Record<string, string>>(() => ({}), Hub.cur, true)

  const route = new Slot(() => {
    const newParams: Record<string, string> = {}
    const route = findRoute(use(routing), locationPath.value.split('/').filter(Boolean), newParams, use(permissions))
    params.value = newParams

    return route
  }, Hub.cur, true)

  const components = new Slot(() => {
    const routeValue = route.value
    if (!routeValue) return []

    const result: Array<Component | LazyResult> = []

    for (let i = 0; i < routeValue.components.length; i++) {
      const component = routeValue.components[i]
      result.push(isLazy(component) ? component() : component)
    }

    return result
  }, Hub.cur, true)

  const loadedComponents = new Map()

  return new JSXNode(Context.Provider, {
    for: paramsContext,
    set: params,
    children: new JSXNode(Pipe, {
      children: (children, index) => new JSXNode(Lazy, {
        component: new Slot(() => components.value[index], Hub.cur, true),
        fallback: new Slot(() => route.value?.fallback?.[index], Hub.cur, true),
        show: new Slot(() => components.value.length > index, Hub.cur, true),
        render: (Component) => new JSXNode(Component, { children }),
        loadedComponents,
      }),
    }),
  })
}
