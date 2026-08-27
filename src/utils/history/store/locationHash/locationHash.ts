import { Slot } from 'rune-hub'

import { historyState } from '../historyState'

export const locationHash = new Slot(function locationHash () {
  return historyState.value && window.location.hash
})
