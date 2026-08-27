import { Slot } from 'rune-hub'

import { historyState } from '../historyState'

export const locationHref = new Slot(function locationHref () {
  return historyState.value && window.location.href
})
