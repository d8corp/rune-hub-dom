import { historyState } from '../historyState'

import { SystemSlot } from '../../../SystemSlot'

export const locationURL = new SystemSlot(function locationURL () {
  return historyState.value && `${window.location.pathname}${window.location.search}${window.location.hash}`
})
