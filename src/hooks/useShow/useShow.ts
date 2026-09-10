import Timer from 'sync-timer'

import { useClear } from '../useClear'

import { SystemSlot } from '../../utils'

export function useShow (delay: number = 100) {
  const show = new SystemSlot(() => false)

  const timer = new Timer(() => {
    show.value = true
  }, delay)

  useClear(() => {
    timer.cancel()
  })

  return show
}
