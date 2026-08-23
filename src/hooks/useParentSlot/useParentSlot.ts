import { Hub } from 'rune-hub'

export function useParentSlot () {
  return Hub.cur?.ctx
}
