import { Slot } from 'rune-hub'

import { urlSearchParams } from '../../store'

const cache: Record<string, Slot<string>> = Object.create(null)

export function getSearchParam (key: string) {
  if (key in cache) return cache[key]

  return (cache[key] = new Slot(function getSearchParam () {
    return urlSearchParams.value.get(key) || ''
  }))
}
