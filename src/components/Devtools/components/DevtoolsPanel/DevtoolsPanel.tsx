import { classes } from 'html-classes'
import type { Slot } from 'rune-hub'

import { DevtoolsSlotItem } from '../DevtoolsSlotItem'
import { DevtoolsSlotPanel } from '../DevtoolsSlotPanel'

import { CloseIcon } from '../../../../docs/icons'
import { useShow, useVirtualList } from '../../../../hooks'
import { Ref } from '../../../../utils'
import { useHidden } from '../../../Delay'
import { For } from '../../../For'
import { Show } from '../../../Show'
import { devtoolsStoreContext } from '../../hooks'
import styles from './DevtoolsPanel.module.scss'

export function DevtoolsPanel () {
  const shown = useShow()
  const hidden = useHidden()
  const { show, search, searchSlots, slots, props, systemFilter, anonFilter } = devtoolsStoreContext.get()!

  const list = new Ref<HTMLDivElement>()

  const { virtualList, offsetTop, offsetBottom } = useVirtualList({ list: searchSlots, itemHeight: 34, scrollbar: list, gap: 4 })

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
          <input class={styles.search} _value={search} oninput={(e: any) => { search.set(e.target.value) }} />
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
                  'padding-top': offsetTop,
                  'padding-bottom': offsetBottom,
                }}
              >
                <For of={virtualList}>
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
