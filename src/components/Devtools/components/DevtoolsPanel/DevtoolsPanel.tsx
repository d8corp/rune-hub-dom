import { classes } from 'html-classes'
import type { Slot } from 'rune-hub'

import { DevtoolsSlotItem } from '../DevtoolsSlotItem'
import { DevtoolsSlotPanel } from '../DevtoolsSlotPanel'

import { CloseIcon } from '../../../../docs/icons'
import { useEffect, useShow } from '../../../../hooks'
import { Ref, SystemSlot } from '../../../../utils'
import { useHidden } from '../../../Delay'
import { For } from '../../../For'
import { Show } from '../../../Show'
import { devtoolsStoreContext } from '../../hooks'
import styles from './DevtoolsPanel.module.scss'

export function DevtoolsPanel () {
  const shown = useShow()
  const hidden = useHidden()
  const { show, search, searchSlots, slots, selected, props, systemFilter, anonFilter } = devtoolsStoreContext.get()!
  const scroll = new SystemSlot(() => 0)

  const height = new SystemSlot(() => 0)
  const heightCount = new SystemSlot(() => (height.value / 38) | 0)

  const scrollIndex = new SystemSlot(() => {
    return Math.min((scroll.value / 38) | 0, searchSlots.value.length - heightCount.value)
  })

  const offset = new SystemSlot(() => scrollIndex.value * 38)
  const paddingTop = new SystemSlot(() => `${offset.value}px`)

  const paddingBottom = new SystemSlot(() => {
    return `${Math.max(0, (searchSlots.value.length * 38) - offset.value - height.value - 38)}px`
  })

  const slotsList = new SystemSlot(() => {
    return searchSlots.value.slice(scrollIndex.value, scrollIndex.value + heightCount.value + 2)
  })

  const list = new Ref<HTMLDivElement>()

  const resizeObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
      height.set(entry.target.clientHeight)
    }
  })

  useEffect(() => {
    const element = list.value

    if (!element) return

    const listener = () => {
      scroll.set(element.scrollTop)
    }

    element.addEventListener('scroll', listener)
    resizeObserver.observe(element)

    return () => {
      resizeObserver.unobserve(element)
      element.removeEventListener('scroll', listener)
    }
  })

  const clickHandler = (slot: Slot<boolean | null>) => () => {
    if (slot.raw === null) {
      slot.set(true)
    } else if (slot.raw) {
      slot.set(false)
    } else {
      slot.set(null)
    }
  }

  const classHandler = (slot: Slot<boolean | null>) => () => {
    return classes([
      styles.filterButton,
      slot.value && styles.filterOnButton,
      slot.value === false && styles.filterOffButton,
    ])
  }

  return (
    <div class={() => classes([styles.root, shown.value && styles.show, hidden?.value && styles.hide])}>
      <div class={styles.header}>
        <button class={styles.closeButton} onclick={() => show.set(false)}>
          <CloseIcon />
        </button>
      </div>
      <div class={styles.main}>
        <div class={styles.filter}>
          {() => `${searchSlots.value.length} / ${slots.value.size}`}
          <input class={styles.search} value={search} oninput={(e: any) => { search.set(e.target.value) }} />
          <Show when={props.anon}>
            <button
              onclick={clickHandler(anonFilter)}
              class={classHandler(anonFilter)}
            >
              anon
            </button>
          </Show>
          <Show when={props.system}>
            <button
              onclick={clickHandler(systemFilter)}
              class={classHandler(systemFilter)}
            >
              system
            </button>
          </Show>
        </div>
        <div class={styles.content}>
          <div class={styles.aside}>
            <div class={styles.list} ref={list}>
              <div
                class={styles.virtualList}
                style={{
                  'padding-top': paddingTop,
                  'padding-bottom': paddingBottom,
                }}
              >
                <For of={slotsList}>
                  {(slot: Slot<Slot>) => <DevtoolsSlotItem slot={slot} />}
                </For>
              </div>
            </div>
          </div>
          <DevtoolsSlotPanel />
        </div>
      </div>
    </div>
  )
}
