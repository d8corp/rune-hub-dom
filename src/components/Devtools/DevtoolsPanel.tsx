import { classes } from 'html-classes'
import type { Slot } from 'rune-hub'

import { useHidden } from '../Delay'
import { For } from '../For'
import { devtoolsStoreContext } from './hooks'

import { useShow } from '../../hooks'
import styles from './DevtoolsPanel.module.scss'

export function DevtoolsPanel () {
  const shown = useShow()
  const hidden = useHidden()
  const { show, search, searchSlots, slots, ups, selected, values } = devtoolsStoreContext.get()!

  return (
    <div class={() => classes([styles.root, shown.value && styles.show, hidden?.value && styles.hide])}>
      <div class={styles.header}>
        <button class={styles.closeButton} onclick={() => show.set(false)}>
          Close
        </button>
        <input value={search} oninput={(e: any) => { search.set(e.target.value) }} />
        {() => `${searchSlots.value.length} / ${slots.value.size}`}
      </div>
      <div class={styles.content}>
        <div class={styles.list}>
          <For of={searchSlots}>
            {(slot: Slot<Slot>) => (
              <div style={{ cursor: 'pointer' }} onclick={() => { selected.set(slot.value) }}>
                {() => ups.value.get(slot.value) ? '🟢 ' : '⚪ '}
                <strong>{() => `${slot.value.rune.name || '—'}:`}</strong>
                {() => ` ${JSON.stringify(values.value.get(slot.value))}`}
              </div>
            )}
          </For>
        </div>
        {() => selected.value && <pre style={{ flex: '1' }}>{String(selected.value.rune)}</pre>}
      </div>
    </div>
  )
}
