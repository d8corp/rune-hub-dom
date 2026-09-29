import { Slot } from 'rune-hub'

import type { ObservableProp, Reactive } from '../../types'

export function use <T> (prop: ObservableProp<T>): T {
  if (prop instanceof Slot) {
    return prop.value
  }

  return typeof prop === 'function' ? (prop as Reactive<T>)() : prop
}
