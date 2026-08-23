import type { Event, Listener } from 'rune-hub'

import { useParentSlot } from '../useParentSlot'

export function useOnce (event: Event, listener: Listener) {
  const stop = useParentSlot()?.on(event, () => {
    stop?.()
    listener()
  })
}
