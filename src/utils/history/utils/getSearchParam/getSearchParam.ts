import type { Slot } from 'rune-hub'

import { SystemSlot } from '../../../SystemSlot'
import { urlSearchParams } from '../../store'

const cache: Record<string, Slot<string>> = Object.create(null)

export function getSearchParam (key: string) {
  if (key in cache) return cache[key]

  return (cache[key] = new SystemSlot(function getSearchParam () {
    return urlSearchParams.value.get(key) || ''
  }))
}
