import { useClear } from '../useClear'

import { startViewTransition, updateHistoryState } from '../../utils'

export function useUpdateHistory () {
  const listener = import.meta.env?.RD_VIEW_TRANSITION === 'true'
    ? () => {
        startViewTransition(updateHistoryState)
      }
    : updateHistoryState

  window.addEventListener('popstate', listener)

  useClear(() => {
    window.removeEventListener('popstate', listener)
  })
}
