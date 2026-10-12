import type { Slot } from 'rune-hub'

import type { BoxProps } from '../../../../primitive'
import { Box } from '../../../../primitive'
import { devtoolsStoreContext } from '../../hooks'

export interface SlotStatusProps extends Omit<BoxProps, 'slot'> {
  slot: Slot<Slot | undefined>
}

export function SlotStatus ({ slot, ...props }: SlotStatusProps) {
  const { ups, errors } = devtoolsStoreContext.get()!

  const color = () => {
    if (!slot.value) return 'warning'

    return errors.value.get(slot.value) ? 'danger' : ups.value.get(slot.value) ? 'success' : 'disabled'
  }

  return <Box size='xxs' {...props} color={color} circle />
}
