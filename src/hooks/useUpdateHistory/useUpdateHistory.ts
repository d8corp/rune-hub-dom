import { useClear } from '../useClear'

import { type HistoryState, startViewTransition, updateHistoryState } from '../../utils'

export function useUpdateHistory () {
  let listener = updateHistoryState

  if (import.meta.env?.RD_VIEW_TRANSITION === 'true') {
    listener = () => startViewTransition(() => {
      updateHistoryState()
      const state = history.state as HistoryState | undefined

      if (state) {
        window.scrollTo({ top: state.scrollY, left: state.scrollX, behavior: 'instant' })
      }
    })

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
      const state = history.state as HistoryState | undefined

      if (state) {
        window.scrollTo({ top: state.scrollY, left: state.scrollX })
      }

      const scrollListener = () => {
        const state = history.state as HistoryState | undefined

        history.replaceState({
          steps: state?.steps || [],
          scrollX: window.scrollX,
          scrollY: window.scrollY,
        } satisfies HistoryState, '')
      }

      window.addEventListener('scrollend', scrollListener)

      useClear(() => {
        window.removeEventListener('scrollend', scrollListener)
      })
    }
  } else {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'auto'
    }
  }

  window.addEventListener('popstate', listener)

  useClear(() => {
    window.removeEventListener('popstate', listener)
  })
}
