import type { Event, Listener } from 'rune-hub'

import { useCtx } from '../useCtx'

export function useOn (event: Event, listener: Listener) {
  useCtx()?.on(event, listener)
}
