import { batch, Hub, type Slot } from 'rune-hub'

import type { DevtoolsProps } from './Devtools'

import { Context, SystemSlot } from '../../utils'

export type DevtoolsStore = ReturnType<typeof useCreateDevtoolsStore>
export const devtoolsStoreContext = new Context<DevtoolsStore | undefined>(undefined)

export function useCreateDevtoolsStore (props: DevtoolsProps, devHub: Hub) {
  const hub = Hub.cur || Hub.root

  const search = new SystemSlot(() => '', devHub)
  const anonFilter = new SystemSlot<boolean | null>(() => false, devHub)
  const systemFilter = new SystemSlot<boolean | null>(() => false, devHub)
  const selected = new SystemSlot<Slot | undefined>(() => {}, devHub)
  const show = new SystemSlot(() => false, devHub)
  const slots = new SystemSlot<Set<Slot>>(() => new Set(Array.from(hub.slots.values()).filter(slot => !(slot instanceof SystemSlot))), devHub)

  const filteredSlots = new SystemSlot(() => {
    const isSystem = systemFilter.value
    const isAnon = anonFilter.value

    if (isSystem === null && isAnon === null) {
      return Array.from(slots.value)
    }

    return Array.from(slots.value).filter(slot => {
      if (isSystem !== null) {
        const isSystemSlot = slot instanceof SystemSlot

        if (isSystem && !isSystemSlot) return false
        if (!isSystem && isSystemSlot) return false
      }

      if (isAnon !== null) {
        const inHub = hub.slots.has(slot.rune)

        if (isAnon && inHub) return false
        if (!isAnon && !inHub) return false
      }

      return true
    })
  }, devHub)

  const searchSlots = new SystemSlot(() => {
    const value = search.value.toLowerCase()

    return value ? filteredSlots.value.filter(slot => slot.rune.name.toLowerCase().includes(value)) : filteredSlots.value
  }, devHub)

  const values = new SystemSlot<Map<Slot, unknown>>(() => new Map(Array.from(slots.raw).map(slot => [slot, slot.raw])), devHub)
  const ups = new SystemSlot<Map<Slot, boolean>>(() => new Map(Array.from(slots.raw).map(slot => [slot, slot.up])), devHub)

  let isWillUpdate = false
  const willUpdate = new Set<Slot>()

  const update = (slot: Slot) => {
    willUpdate.add(slot)
    if (isWillUpdate) return
    isWillUpdate = true

    queueMicrotask(() => {
      const slots = Array.from(willUpdate)
      willUpdate.clear()
      isWillUpdate = false

      batch(() => {
        for (const slot of slots) {
          slot.update()
        }
      })
    })
  }

  const check = (slot: Slot) => {
    if (!props.system && slot instanceof SystemSlot) return true
    if (!props.anon && !hub.slots.has(slot.rune)) return true

    return false
  }

  hub.on('init', slot => {
    if (check(slot)) return

    slots.raw.add(slot)
    values.raw.set(slot, slot.raw)

    update(slot)
    update(values)
  })

  hub.on('change', slot => {
    if (check(slot)) return

    values.raw.set(slot, slot.raw)
    update(values)
  })

  hub.on('up', slot => {
    if (check(slot)) return

    ups.raw.set(slot, true)
    update(ups)
  })

  hub.on('down', slot => {
    if (check(slot)) return

    if (hub.slots.has(slot.rune)) {
      ups.raw.set(slot, false)
      update(ups)

      return
    }

    slots.raw.delete(slot)
    values.raw.delete(slot)
    ups.raw.delete(slot)

    update(slots)
    update(values)
    update(ups)
  })

  hub.on('destroy', slot => {
    if (check(slot)) return

    slots.raw.delete(slot)
    values.raw.delete(slot)
    ups.raw.delete(slot)

    update(slots)
    update(values)
    update(ups)
  })

  return {
    search,
    selected,
    show,
    slots,
    searchSlots,
    values,
    ups,
    hub,
    props,
    systemFilter,
    anonFilter,
  }
}
