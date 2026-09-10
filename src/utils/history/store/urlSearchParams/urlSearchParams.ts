import { locationSearch } from '../locationSearch'

import { SystemSlot } from '../../../SystemSlot'

export const urlSearchParams = new SystemSlot(function urlSearchParams () {
  return new URLSearchParams(locationSearch.value)
})
