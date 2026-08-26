import { Slot } from 'rune-hub'

import type { ObservableProp, RuneProp } from '../../types'

export function observablePropToRuneProp <T> (value: ObservableProp<T>): RuneProp<T> {
  if (value instanceof Slot) {
    return () => value.value
  }

  return value
}
