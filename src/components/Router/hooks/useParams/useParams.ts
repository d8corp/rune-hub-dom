import type { Slot } from 'rune-hub'

import { Context } from '../../../../utils'

export const paramsContext = new Context<undefined | Slot<Record<string, string>>>(undefined)

export function useParams<T extends Record<string, string>> (): Slot<T> {
  const params = paramsContext.get()

  if (!params) {
    throw Error('useParams must be used in Router')
  }

  return params as Slot<T>
}
