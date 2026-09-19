import { Slot } from 'rune-hub'

import type { ObservableProp } from '../../types'

export function getSlotEvent<T> (
  value: ObservableProp<T>,
  slotEvent?: (value: T) => void,
) {
  return value && value instanceof Slot
    ? (val: T) => {
        value.set(val)
        slotEvent?.(val)
      }
    : slotEvent
}
