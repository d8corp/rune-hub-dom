import { Context } from '../../../utils'

export interface PageUpdatedData {
  updated: boolean
}

export const pageUpdated = new Context<PageUpdatedData>({ updated: true })

export function usePageUpdated () {
  return pageUpdated.get().updated
}
