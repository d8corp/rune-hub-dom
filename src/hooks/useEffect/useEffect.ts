import { hub } from 'rune-hub'

import { useClear } from '../useClear'

import { Context } from '../../utils'

export type Effect = () => undefined | (() => void)

export function useEffect (effect: Effect) {
  const currentHub = hub()
  const currentContext = Context.current

  let destroyed = false

  useClear(() => {
    destroyed = true
  })

  queueMicrotask(() => {
    if (destroyed) return

    currentHub.use(() => {
      Context.use(() => {
        const destroy = effect()

        if (destroy) {
          useClear(destroy)
        }
      }, currentContext)
    })
  })
}
