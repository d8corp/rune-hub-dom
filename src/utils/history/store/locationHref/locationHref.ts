import { historyState } from '../historyState'

import { SystemSlot } from '../../../SystemSlot'

export const locationHref = new SystemSlot(function locationHref () {
  return historyState.value && window.location.href
})
