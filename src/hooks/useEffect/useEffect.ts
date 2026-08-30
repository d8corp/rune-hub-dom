import { hub } from 'rune-hub'

import { useOnce } from '../useOnce'

import { Context } from '../../utils'

export type Effect = () => undefined | (() => void)

export function useEffect (effect: Effect) {
  const currentHub = hub()
  const currentContext = Context.current

  let destroyed = false

  useOnce('clear', () => {
    destroyed = true
  })

  queueMicrotask(() => {
    if (destroyed) return

    currentHub.use(() => {
      Context.use(() => {
        const destroy = effect()

        if (destroy) {
          useOnce('clear', destroy)
        }
      }, currentContext)
    })
  })
}
