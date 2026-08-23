import type { Rune } from 'rune-hub'
import { Slot } from 'rune-hub'

import { type ObservableProp } from '../../types'

export function use <T> (prop: ObservableProp<T>): T {
  if (prop instanceof Slot) {
    return prop.value
  }

  return typeof prop === 'function' ? (prop as Rune<T>)() : prop
}
