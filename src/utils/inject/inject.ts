import { Slot } from 'rune-hub'

import { use } from '../use'

import type { ObservableProp, Reactive } from '../../types'

export type InjectCallback <V, R> = (value: V) => R

export function inject <V, R> (value: ObservableProp<V>, callback: InjectCallback<V, R>): R | Reactive<R> {
  if (value instanceof Slot || value instanceof Function) {
    return () => callback(use(value))
  }

  return callback(value)
}
