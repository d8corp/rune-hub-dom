import type { Slot } from 'rune-hub'
import { batch, Hub } from 'rune-hub'

import { For } from '../For'

import { SystemSlot } from '../../utils'
import styles from './Devtools.module.scss'

export function Devtools () {
  const hub = Hub.cur || Hub.root

  const search = new SystemSlot(() => '')
  const selected = new SystemSlot<Slot | undefined>(() => {})
  const show = new SystemSlot(() => false)
  const slots = new SystemSlot<Set<Slot>>(() => new Set(Array.from(hub.slots.values()).filter(slot => !(slot instanceof SystemSlot))))
  const searchSlots = new SystemSlot(() => search.value ? Array.from(slots.value).filter(slot => slot.rune.name.includes(search.raw)) : Array.from(slots.value))
  const values = new SystemSlot<Map<Slot, unknown>>(() => new Map(Array.from(slots.raw).map(slot => [slot, slot.raw])))
  const ups = new SystemSlot<Map<Slot, boolean>>(() => new Map(Array.from(slots.raw).map(slot => [slot, slot.up])))

  const toggle = () => {
    show.set(!show.raw)
  }

  hub.on('init', slot => {
    if (slot instanceof SystemSlot) return

    slots.raw.add(slot)
    values.raw.set(slot, slot.raw)

    batch(() => {
      slots.update()
      values.update()
    })
  })

  hub.on('change', slot => {
    if (slot instanceof SystemSlot) return

    values.raw.set(slot, slot.raw)
    values.update()
  })

  hub.on('up', slot => {
    ups.raw.set(slot, true)
    ups.update()
  })

  hub.on('down', slot => {
    if (hub.slots.has(slot.rune)) {
      ups.raw.set(slot, false)
      ups.update()

      return
    }

    slots.raw.delete(slot)
    values.raw.delete(slot)
    ups.raw.delete(slot)

    batch(() => {
      slots.update()
      values.update()
    })
  })

  return () => show.value
    ? (
      <div class={styles.root}>
        <div class={styles.header}>
          <button class={styles.closeButton} onclick={toggle}>Close</button>
          <input _value={search} oninput={(e: any) => { search.set(e.target.value) }} />
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
    : (
      <button onclick={toggle} class={styles.openButton}>
        Devtools
      </button>
      )
}
