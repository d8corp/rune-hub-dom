import { Hub, Slot } from 'rune-hub'

import { useParams } from '../useParams'

export function useParam<T extends string | undefined> (name: string): Slot<T> {
  const params = useParams()

  return new Slot<T>(() => params.value[name] as T, Hub.cur, true)
}
