import { Slot } from 'rune-hub'

import { historyState } from '../historyState'

export const locationSearch = new Slot(function locationSearch () {
  return historyState.value && window.location.search
})
