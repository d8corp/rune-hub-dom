import { historyState } from '../historyState'

import { SystemSlot } from '../../../SystemSlot'

export const locationSearch = new SystemSlot(function locationSearch () {
  return historyState.value && window.location.search
})
