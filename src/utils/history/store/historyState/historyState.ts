import { SystemSlot } from '../../../SystemSlot'

export interface HistoryStep {
  url: string
}

export interface HistoryState {
  steps: HistoryStep[]
  scrollX: number
  scrollY: number
}

export function getHistoryStateRaw (): HistoryState {
  return window.history.state ?? {
    steps: [],
    scrollX: window.scrollX,
    scrollY: window.scrollY,
  }
}

export const historyState = new SystemSlot(getHistoryStateRaw)

export function updateHistoryState () {
  historyState.set(getHistoryStateRaw())
}
