import { historyState } from '../historyState'

import { SystemSlot } from '../../../SystemSlot'

let _lastLength = 0

export type HistoryMovement = 'back' | 'forward' | 'same'

export const historyMovement = new SystemSlot<HistoryMovement>(function historyMovement () {
  const currentLength = historyState.value.steps.length
  const lastLength = _lastLength
  _lastLength = currentLength

  if (currentLength > lastLength) return 'forward'
  if (currentLength < lastLength) return 'back'

  return 'same'
})
