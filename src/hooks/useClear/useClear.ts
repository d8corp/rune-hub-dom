import type { Listener } from 'rune-hub'

import { useOnce } from '../useOnce'

export function useClear (listener: Listener) {
  useOnce('clear', listener)
}
