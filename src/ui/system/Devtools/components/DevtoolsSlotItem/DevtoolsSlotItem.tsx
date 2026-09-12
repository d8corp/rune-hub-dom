import { classes } from 'html-classes'
import type { Slot } from 'rune-hub'

import { SlotStatus } from '../SlotStatus'

import { devtoolsStoreContext } from '../../hooks'
import styles from './DevtoolsSlotItem.module.scss'

export interface DevtoolsSlotItemProps {
  slot: Slot<Slot>
}

export function DevtoolsSlotItem ({ slot }: DevtoolsSlotItemProps) {
  const { selected, values } = devtoolsStoreContext.get()!

  const handleClick = () => {
    selected.set(slot.value)
  }

  return (
    <div class={() => classes([styles.root, selected.value === slot.value && styles.selected])} onclick={handleClick}>
      <SlotStatus slot={slot} />
      <strong>{() => `${slot.value.rune.name || '—'}:`}</strong>
      <div class={styles.value}>
        {() => ` ${JSON.stringify(values.value.get(slot.value))}`}
      </div>
    </div>
  )
}
