import { updateHistoryState } from '../../store/historyState'

export function replaceHistory (url: string): void {
  const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`

  if (url === currentUrl) return

  const steps = window.history.state?.steps || []
  const lastStep = steps[steps.length - 1]
  const restSteps = steps.slice(0, -1)

  window.history.replaceState({
    steps: [
      ...restSteps,
      {
        ...lastStep,
        url,
      },
    ],
  }, '', url)

  updateHistoryState()
}
