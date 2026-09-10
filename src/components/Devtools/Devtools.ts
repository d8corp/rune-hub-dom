import type { Slot } from 'rune-hub'
import { batch, Hub } from 'rune-hub'

import { For } from '../For'

import { JSXNode } from '../../types'
import { SystemSlot } from '../../utils'

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
    ? new JSXNode('div', {
      style: {
        '--color-bg': 'light-dark(#fff, #161626)',
        '--color-border': 'light-dark(#7C3AED1F, #8B5CF61F)',
        '--color-text-muted': 'light-dark(#5B556E, #94A3B8)',
        position: 'fixed',
        bottom: '10px',
        left: '10px',
        right: '10px',
        padding: '10px',
        'border-radius': '6px',
        background: 'var(--color-bg)',
        border: '1px solid var(--color-border)',
        'box-shadow': '1px var(--color-border)',
        display: 'flex',
        'flex-direction': 'column',
        'z-index': 999999,
        height: '50vh',
        color: 'var(--color-text-muted)',
      },
      children: [
        new JSXNode('div', {
          style: {
            display: 'flex',
            gap: '10px',
          },
          children: [
            new JSXNode('button', {
              style: {
                cursor: 'pointer',
              },
              onclick: toggle,
              children: 'Close',
            }),
            new JSXNode('input', {
              _value: search,
              oninput: (e: any) => { search.set(e.target.value) },
            }),
            () => `${searchSlots.value.length} / ${slots.value.size}`,
          ],
        }),
        new JSXNode('div', {
          style: {
            display: 'flex',
            flex: '1',
            'min-height': 0,
          },
          children: [
            new JSXNode('div', {
              style: {
                display: 'flex',
                flex: 1,
                'flex-direction': 'column',
                overflow: 'auto',
                'overscroll-behavior': 'contain',
              },
              children: new JSXNode(For, {
                of: searchSlots,
                children: (slot: Slot<Slot>) => new JSXNode('div', {
                  style: {
                    cursor: 'pointer',
                  },
                  onclick: () => {
                    selected.set(slot.value)
                  },
                  children: [
                    () => ups.value.get(slot.value) ? '🟢 ' : '⚪ ',
                    new JSXNode('strong', {
                      children: () => `${slot.value.rune.name || '—'}:`,
                    }),
                    () => ` ${JSON.stringify(values.value.get(slot.value))}`,
                  ],
                }),
              }),
            }),
            () => selected.value && new JSXNode('pre', {
              style: {
                flex: 1,
              },
              children: String(selected.value.rune),
            }),
          ],
        }),
      ],
    })
    : new JSXNode('button', {
      style: {
        position: 'fixed',
        cursor: 'pointer',
        bottom: '10px',
        left: '10px',
        'z-index': 999999,
      },
      onclick: toggle,
      children: 'Devtools',
    })
}
