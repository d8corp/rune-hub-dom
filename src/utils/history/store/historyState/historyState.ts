import { Slot } from 'rune-hub'

export interface HistoryStep {
  url: string
}

export interface HistoryState {
  steps: HistoryStep[]
}

export function getHistoryStateRaw (): HistoryState {
  return window.history.state ?? {
    steps: [],
  }
}

export const historyState = new Slot(() => getHistoryStateRaw())

export function updateHistoryState () {
  historyState.set(getHistoryStateRaw())
}

window.addEventListener('popstate', updateHistoryState)
