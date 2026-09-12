import { classes } from 'html-classes'
import type { Slot } from 'rune-hub'

import { DevtoolsSlotItem } from '../DevtoolsSlotItem'
import { DevtoolsSlotPanel } from '../DevtoolsSlotPanel'

import { For, Show, useHidden } from '../../../../../components'
import { CloseIcon, SearchIcon } from '../../../../../docs/icons'
import { useShow, useVirtualList } from '../../../../../hooks'
import { Ref } from '../../../../../utils'
import { devtoolsStoreContext } from '../../hooks'
import styles from './DevtoolsPanel.module.scss'

export function DevtoolsPanel () {
  const list = new Ref<HTMLDivElement>()
  const shown = useShow()
  const hidden = useHidden()
  const { show, search, searchSlots, slots, props, systemFilter, anonFilter } = devtoolsStoreContext.get()!

  const { virtualList, offsetTop, offsetBottom } = useVirtualList({
    list: searchSlots,
    scrollbar: list,
    itemHeight: 34,
    gap: 4,
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

  const handleExport = () => {
    const result = searchSlots.raw.map(slot => ({
      name: slot.rune.name,
      value: slot.cur,
    }))

    navigator.clipboard.writeText(JSON.stringify(result, null, 2))
  }

  return (
    <div class={() => classes([styles.root, shown.value && styles.show, hidden?.value && styles.hide])}>
      <div class={styles.header}>
        <button class={styles.closeButton} onclick={() => show.set(false)}>
          <CloseIcon />
        </button>
      </div>
      <div class={styles.main}>
        <div class={styles.aside}>
          <div class={styles.asideHeader}>
            <label class={styles.search}>
              <SearchIcon />
              <input _value={search} oninput={(e: any) => { search.set(e.target.value) }} />
              {() => `${searchSlots.value.length} / ${slots.value.size}`}
            </label>
          </div>
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
        <div class={styles.content}>
          <div class={styles.filter}>
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
            <button onclick={handleExport}>
              Export
            </button>
          </div>
          <DevtoolsSlotPanel />
        </div>
      </div>
    </div>
  )
}
