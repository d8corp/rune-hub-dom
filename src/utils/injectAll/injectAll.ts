import type { Rune } from 'rune-hub'
import { Slot } from 'rune-hub'

import { use } from '../use'

type UnwrapStateProp<X> = X extends Slot<infer V>
  ? V
  : X extends (() => infer V)
    ? V
    : X

type IsDynamic<X> = X extends Slot<any>
  ? true
  : X extends (() => any)
    ? true
    : false

type HasDynamic<T extends readonly any[]> = true extends {
  [K in keyof T]: IsDynamic<T[K]>
}[number]
  ? true
  : false

export function injectAll<T extends readonly any[], R> (
  values: readonly [...T],
  callback: (values: { [K in keyof T]: UnwrapStateProp<T[K]> }) => R,
): HasDynamic<T> extends true ? Rune<R> : R {
  const hasDynamic = values.some((v: any) => v instanceof Slot || v instanceof Function)

  if (hasDynamic) {
    return (() => callback(values.map(use) as any)) as any
  }

  return callback(values as any) as any
}
