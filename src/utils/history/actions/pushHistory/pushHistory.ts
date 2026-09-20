import type { HistoryState } from '../../store/historyState'
import { updateHistoryState } from '../../store/historyState'

export function pushHistory (url: string): void {
  const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`

  if (url === currentUrl) return

  const state = window.history.state as HistoryState | undefined

  window.history.pushState({
    steps: [
      ...(state?.steps || []),
      { url },
    ],
    scrollX: window.scrollX,
    scrollY: window.scrollY,
  } satisfies HistoryState, '', url)

  updateHistoryState()
}
