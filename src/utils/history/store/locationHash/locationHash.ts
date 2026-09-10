import { historyState } from '../historyState'

import { SystemSlot } from '../../../SystemSlot'

export const locationHash = new SystemSlot(function locationHash () {
  return historyState.value && window.location.hash
})
