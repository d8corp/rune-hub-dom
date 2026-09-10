import { batch, Hub, type Slot } from 'rune-hub'

import { Context, SystemSlot } from '../../utils'

export type DevtoolsStore = ReturnType<typeof useCreateDevtoolsStore>
export const devtoolsStoreContext = new Context<DevtoolsStore | undefined>(undefined)

export function useCreateDevtoolsStore () {
  const hub = Hub.cur || Hub.root

  const search = new SystemSlot(() => '')
  const selected = new SystemSlot<Slot | undefined>(() => {})
  const show = new SystemSlot(() => false)
  const slots = new SystemSlot<Set<Slot>>(() => new Set(Array.from(hub.slots.values()).filter(slot => !(slot instanceof SystemSlot))))
  const searchSlots = new SystemSlot(() => search.value ? Array.from(slots.value).filter(slot => slot.rune.name.includes(search.raw)) : Array.from(slots.value))
  const values = new SystemSlot<Map<Slot, unknown>>(() => new Map(Array.from(slots.raw).map(slot => [slot, slot.raw])))
  const ups = new SystemSlot<Map<Slot, boolean>>(() => new Map(Array.from(slots.raw).map(slot => [slot, slot.up])))

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

  return {
    search,
    selected,
    show,
    slots,
    searchSlots,
    values,
    ups,
  }
}
