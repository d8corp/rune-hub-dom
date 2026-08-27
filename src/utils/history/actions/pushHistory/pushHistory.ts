import { updateHistoryState } from '../../store/historyState'

export function pushHistory (url: string): void {
  const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`

  if (url === currentUrl) return

  window.history.pushState({
    steps: [
      ...(window.history.state?.steps || []),
      { url },
    ],
  }, '', url)

  updateHistoryState()
}
