import { Slot } from 'rune-hub'
import Timer from 'sync-timer'

import { useOnce } from '../useOnce'

export function useShow (delay: number = 100) {
  const show = new Slot(() => false)

  const timer = new Timer(() => {
    show.value = true
  }, delay)

  useOnce('clear', () => {
    timer.cancel()
  })

  return show
}
