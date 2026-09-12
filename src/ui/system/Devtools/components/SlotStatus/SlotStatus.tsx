import type { Slot } from 'rune-hub'

import type { DotProps } from '../../../../layout'
import { Dot } from '../../../../layout'
import { devtoolsStoreContext } from '../../hooks'

export interface SlotStatusProps extends Omit<DotProps, 'slot'> {
  slot: Slot<Slot | undefined>
}

export function SlotStatus ({ slot, ...props }: SlotStatusProps) {
  const { ups } = devtoolsStoreContext.get()!

  return <Dot {...props} color={() => slot.value && ups.value.get(slot.value) ? 'success' : 'disabled'} />
}
