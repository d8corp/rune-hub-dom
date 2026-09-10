import { historyState } from '../historyState'

import { SystemSlot } from '../../../SystemSlot'

export const locationPath = new SystemSlot(function locationPath () {
  return historyState.value && window.location.pathname
})
