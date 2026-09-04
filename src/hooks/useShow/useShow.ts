import { Slot } from 'rune-hub'
import Timer from 'sync-timer'

import { useClear } from '../useClear'

export function useShow (delay: number = 100) {
  const show = new Slot(() => false)

  const timer = new Timer(() => {
    show.value = true
  }, delay)

  useClear(() => {
    timer.cancel()
  })

  return show
}
