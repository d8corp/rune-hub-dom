import type { Rune } from 'rune-hub'
import { Slot } from 'rune-hub'

import { use } from '../use'

import { type ObservableProp } from '../../types'

export type InjectCallback <V, R> = (value: V) => R

export function inject <V, R> (value: ObservableProp<V>, callback: InjectCallback<V, R>): R | Rune<R> {
  if (value instanceof Slot || value instanceof Function) {
    return () => callback(use(value))
  }

  return callback(value)
}
