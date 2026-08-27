import { Slot } from 'rune-hub'

export interface HistoryStep {
  url: string
}

export interface HistoryState {
  steps: HistoryStep[]
}

export const historyState = new Slot(getHistoryStateRaw)

export function getHistoryStateRaw (): HistoryState {
  return window.history.state ?? {
    steps: [],
  }
}

export function updateHistoryState () {
  historyState.value = getHistoryStateRaw()
}

window.addEventListener('popstate', updateHistoryState)
