import type { Event, Listener } from 'rune-hub'

import { useCtx } from '../useCtx'

export function useOnce (event: Event, listener: Listener) {
  const stop = useCtx()?.on(event, () => {
    stop?.()
    listener()
  })
}
