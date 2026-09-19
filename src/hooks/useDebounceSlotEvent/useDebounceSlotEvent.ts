import SyncTimer from 'sync-timer'

import { useClear } from '../useClear'

import type { ObservableProp } from '../../types'
import { getSlotEvent, use } from '../../utils'

export type ObservableDebounce = ObservableProp<boolean | number>

export function useDebounceSlotEvent<T> (
  value: ObservableProp<T>,
  slotEvent?: (value: T) => void,
  debounce?: ObservableDebounce,
) {
  let timer: SyncTimer
  const setValue = getSlotEvent(value, slotEvent)

  if (!setValue) return

  useClear(() => {
    timer?.cancel()
  })

  return (newValue: T) => {
    timer?.cancel()
    const debouncedValue = use(debounce)

    if (debouncedValue) {
      timer = new SyncTimer(() => {
        setValue(newValue)
      }, debouncedValue === true ? 300 : debouncedValue)
    }
  }
}
