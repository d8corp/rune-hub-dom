import { classes } from 'html-classes'
import type { Slot } from 'rune-hub'

import { DevtoolsSlotItem } from '../DevtoolsSlotItem'
import { DevtoolsSlotPanel } from '../DevtoolsSlotPanel'

import { For, Show, useHidden } from '../../../../../components'
import { CloseIcon, SearchIcon } from '../../../../../docs/icons'
import { Divider } from '../../../../../docs/ui'
import { useShow, useVirtualList } from '../../../../../hooks'
import type { RDColor } from '../../../../../types'
import { Ref } from '../../../../../utils'
import { Button } from '../../../../action'
import { Dot, Flex } from '../../../../layout'
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

  const colorHandler = (slot: Slot<boolean | null>) => (): RDColor => {
    return slot.value ? 'success' : slot.value === false ? 'danger' : 'secondary'
  }

  const handleExport = () => {
    const result = searchSlots.raw.map(slot => ({
      name: slot.rune.name,
      value: slot.cur,
    }))

    navigator.clipboard.writeText(JSON.stringify(result, null, 2))
  }

  return (
    <div data-glow class={() => classes([styles.root, shown.value && styles.show, hidden?.value && styles.hide])}>
      <Flex gap={8} align='center'>
        <Dot hoverable color='danger' onclick={() => show.set(false)}>
          <CloseIcon />
        </Dot>
        <Dot hoverable color='warning' />
        <Dot hoverable color='success' />
      </Flex>
      <div data-glow class={styles.main}>
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
              <Button
                size='s'
                data-shine
                color={colorHandler(anonFilter)}
                onclick={clickHandler(anonFilter)}
              >
                Anon
              </Button>
            </Show>
            <Show when={props.system}>
              <Button
                data-shine
                size='s'
                color={colorHandler(systemFilter)}
                onclick={clickHandler(systemFilter)}
              >
                System
              </Button>
            </Show>
            <Divider vertical />
            <Button size='s' data-glow data-shine onclick={handleExport}>
              Export
            </Button>
          </div>
          <DevtoolsSlotPanel />
        </div>
      </div>
    </div>
  )
}
