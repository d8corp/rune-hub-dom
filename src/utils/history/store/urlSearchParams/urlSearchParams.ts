import { Slot } from 'rune-hub'

import { locationSearch } from '../locationSearch'

export const urlSearchParams = new Slot(function urlSearchParams () {
  return new URLSearchParams(locationSearch.value)
})
