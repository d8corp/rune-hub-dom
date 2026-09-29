import { Slot } from 'rune-hub'

import type { ObservableProp, StaticOrReactive } from '../../types'

export function observablePropToStaticOrReactive <T> (value: ObservableProp<T>): StaticOrReactive<T> {
  if (value instanceof Slot) {
    return () => value.value
  }

  return value
}
