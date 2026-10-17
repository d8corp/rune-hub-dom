import { Slot } from 'rune-hub'

import type { ObservableProp } from '../../types'

export function getSlotEvent<T, TT extends T> (
  value: ObservableProp<T>,
  slotEvent?: (value: TT) => void,
) {
  return value && value instanceof Slot
    ? (val: TT) => {
        value.set(val)
        slotEvent?.(val)
      }
    : slotEvent
}
