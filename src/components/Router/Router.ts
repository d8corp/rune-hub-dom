import { Lazy } from '../Lazy'
import { Pipe } from '../Pipe'
import { findRoute } from './helpers/findRoute'
import { paramsContext } from './hooks'
import { type Routing } from './types'

import { type Component, JSXNode, type ObservableProp } from '../../types'
import { Context, isLazy, type LazyResult, locationPath, SystemSlot, use } from '../../utils'

export interface RouterProps {
  routing: ObservableProp<Routing>
  permissions?: ObservableProp<Set<string>>
}

const EMPTY_SET = new Set<string>()

export function Router ({ routing, permissions = EMPTY_SET }: RouterProps) {
  const params = paramsContext.get() || new SystemSlot<Record<string, string>>(function routerParams () { return {} })

  const currentRoute = () => {
    const newParams: Record<string, string> = {}
    let path = locationPath.value

    if (import.meta.env?.RD_BASE_URL) {
      if (!path.startsWith(import.meta.env.RD_BASE_URL)) return

      path = path.slice(import.meta.env.RD_BASE_URL.length)
    }

    const route = findRoute(use(routing), path.split('/').filter(Boolean), newParams, use(permissions))
    params.value = newParams

    return route
  }

  const route = new SystemSlot(currentRoute)

  const routeComponents = () => {
    const routeValue = route.value
    if (!routeValue) return []

    const result: Array<Component | LazyResult> = []

    for (let i = 0; i < routeValue.components.length; i++) {
      const component = routeValue.components[i]
      result.push(isLazy(component) ? component() : component)
    }

    return result
  }

  const components = new SystemSlot(routeComponents)

  const loadedComponents = new Map()

  return new JSXNode(Context.Provider, {
    for: paramsContext,
    set: params,
    children: new JSXNode(Pipe, {
      children: (children, index) => new JSXNode(Lazy, {
        component: new SystemSlot(function routeComponent () { return components.value[index] }),
        fallback: new SystemSlot(function routeFallback () { return route.value?.fallback?.[index] }),
        show: new SystemSlot(function routeShow () { return components.value.length > index }),
        render: (Component) => new JSXNode(Component, { children }),
        loadedComponents,
      }),
    }),
  })
}
