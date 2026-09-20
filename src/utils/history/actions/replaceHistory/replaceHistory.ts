import type { HistoryState } from '../../store/historyState'
import { updateHistoryState } from '../../store/historyState'

export function replaceHistory (url: string): void {
  const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`

  if (url === currentUrl) return

  const state = window.history.state as HistoryState | undefined
  const steps = state?.steps || []
  const lastStep = steps[steps.length - 1]
  const restSteps = steps.slice(0, -1)

  window.history.replaceState({
    scrollX: window.scrollX,
    scrollY: window.scrollY,
    ...state,
    steps: [
      ...restSteps,
      {
        ...lastStep,
        url,
      },
    ],
  } satisfies HistoryState, '', url)

  updateHistoryState()
}
