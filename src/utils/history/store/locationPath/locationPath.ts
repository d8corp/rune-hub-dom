import { Slot } from 'rune-hub'

import { historyState } from '../historyState'

export const locationPath = new Slot(function locationPath () {
  return historyState.value && window.location.pathname
})
