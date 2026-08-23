import type { Event, Listener } from 'rune-hub'

import { useParentSlot } from '../useParentSlot'

export function useOn (event: Event, listener: Listener) {
  useParentSlot()?.on(event, listener)
}
