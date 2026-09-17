import type { Slot } from 'rune-hub'

import type { DotProps } from '../../../../inline'
import { Dot } from '../../../../inline'
import { devtoolsStoreContext } from '../../hooks'

export interface SlotStatusProps extends Omit<DotProps, 'slot'> {
  slot: Slot<Slot | undefined>
}

export function SlotStatus ({ slot, ...props }: SlotStatusProps) {
  const { ups, errors } = devtoolsStoreContext.get()!

  const color = () => {
    if (!slot.value) return 'warning'

    return errors.value.get(slot.value) ? 'danger' : ups.value.get(slot.value) ? 'success' : 'disabled'
  }

  return <Dot {...props} color={color} />
}
