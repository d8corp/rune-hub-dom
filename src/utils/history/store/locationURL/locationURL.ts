import { Slot } from 'rune-hub'

import { historyState } from '../historyState'

export const locationURL = new Slot(function locationURL () {
  return historyState.value && `${window.location.pathname}${window.location.search}${window.location.hash}`
})
