import { inject } from '../inject'

import type { ObservableProp, Reactive } from '../../types'

export function asIs<T> (value: T): T {
  return value
}

export function injectAsIs<V> (value: ObservableProp<V>): V | Reactive<V> {
  return inject(value, asIs)
}
