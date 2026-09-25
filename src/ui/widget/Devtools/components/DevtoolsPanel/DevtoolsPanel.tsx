import { classes } from 'html-classes'
import type { Slot } from 'rune-hub'

import { DevtoolsSlotItem } from '../DevtoolsSlotItem'
import { DevtoolsSlotPanel } from '../DevtoolsSlotPanel'

import { For, Show, useHidden } from '../../../../../components'
import { useShow, useVirtualList } from '../../../../../hooks'
import type { RDColor } from '../../../../../types'
import { Ref } from '../../../../../utils'
import { Button } from '../../../../block'
import { SearchIcon } from '../../../../icons'
import { Divider, Dot } from '../../../../inline'
import { Input } from '../../../../interaction'
import { Window, WindowHeader } from '../../../../popup'
import { WindowContent } from '../../../../popup/WindowContent'
import { devtoolsStoreContext } from '../../hooks'
import styles from './DevtoolsPanel.module.scss'

export function DevtoolsPanel () {
  const list = new Ref<HTMLDivElement>()
  const shown = useShow()
  const hidden = useHidden()
  const { show, search, searchSlots, slots, props, systemFilter, errorFilter, anonFilter, errors } = devtoolsStoreContext.get()!

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
    return slot.value ? 'accent' : slot.value === false ? 'primary' : 'secondary'
  }

  const handleExport = () => {
    const result = searchSlots.raw.map(slot => ({
      name: slot.rune.name,
      value: slot.cur,
    }))

    navigator.clipboard.writeText(JSON.stringify(result, null, 2))
  }

  return (
    <Window data-glow class={() => classes([styles.root, shown.value && styles.show, hidden?.value && styles.hide])}>
      <WindowHeader onClose={() => show.set(false)}>
        <Dot hoverable color='warning' />
        <Dot hoverable color='success' />
      </WindowHeader>
      <WindowContent data-glow>
        <div class={styles.aside}>
          <div class={styles.asideHeader}>
            <Input
              data-glow
              flex
              size='s'
              circle
              autofocus
              clearable
              debounce
              value={search}
              name='search'
              before={<SearchIcon />}
              after={() => `${searchSlots.value.length} / ${slots.value.size}`}
            />
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
                circle
                color={colorHandler(anonFilter)}
                onclick={clickHandler(anonFilter)}
              >
                Anon
              </Button>
            </Show>
            <Show when={props.system}>
              <Button
                data-shine
                circle
                size='s'
                color={colorHandler(systemFilter)}
                onclick={clickHandler(systemFilter)}
              >
                System
              </Button>
            </Show>
            <Button
              data-shine
              circle
              size='s'
              color={colorHandler(errorFilter)}
              onclick={clickHandler(errorFilter)}
            >
              Errors: {() => errors.value.size}
            </Button>
            <Divider vertical />
            <Button size='s' data-glow data-shine onclick={handleExport}>
              Export
            </Button>
          </div>
          <DevtoolsSlotPanel />
        </div>
      </WindowContent>
    </Window>
  )
}
