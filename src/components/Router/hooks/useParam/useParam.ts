import type { Slot } from 'rune-hub'

import { useParams } from '../useParams'

import { SystemSlot } from '../../../../utils'

export function useParam<T extends string | undefined> (name: string): Slot<T> {
  const params = useParams()

  return new SystemSlot<T>(() => params.value[name] as T)
}
