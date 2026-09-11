import { classes } from 'html-classes'
import type { Slot } from 'rune-hub'

import { devtoolsStoreContext } from '../../hooks'
import styles from './DevtoolsSlotItem.module.scss'

export interface DevtoolsSlotItemProps {
  slot: Slot<Slot>
}

export function DevtoolsSlotItem ({ slot }: DevtoolsSlotItemProps) {
  const { ups, selected, values } = devtoolsStoreContext.get()!

  const handleClick = () => {
    selected.set(slot.value)
  }

  return (
    <div class={() => classes([styles.root, selected.value === slot.value && styles.selected])} onclick={handleClick}>
      {() => ups.value.get(slot.value) ? '🟢 ' : '⚪ '}
      <strong>{() => `${slot.value.rune.name || '—'}:`}</strong>
      <div class={styles.value}>
        {() => ` ${JSON.stringify(values.value.get(slot.value))}`}
      </div>
    </div>
  )
}
