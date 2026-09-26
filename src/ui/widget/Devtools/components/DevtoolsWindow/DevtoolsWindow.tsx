import type { Slot } from 'rune-hub'

import { DevtoolsSlotItem } from '../DevtoolsSlotItem'
import { DevtoolsSlotPanel } from '../DevtoolsSlotPanel'

import { For, Show } from '../../../../../components'
import { useStyles, useVirtualList } from '../../../../../hooks'
import type { RDColor } from '../../../../../types'
import { addCSS, Ref, viewTransition } from '../../../../../utils'
import { Button } from '../../../../block'
import { SearchIcon } from '../../../../icons'
import { Divider, Dot } from '../../../../inline'
import { Input } from '../../../../interaction'
import type { WindowProps } from '../../../../popup'
import { Window, WindowHeader } from '../../../../popup'
import { WindowContent } from '../../../../popup/WindowContent'
import type { FlexElement } from '../../../../primitive'
import { devtoolsStoreContext } from '../../hooks'

if (import.meta.env?.RD_THEME_DEVTOOLS_WINDOW) {
  addCSS(import.meta.env.RD_THEME_DEVTOOLS_WINDOW, 'devtools-window')
}

export const devtoolsWindowStyles = {
  root: import.meta.env?.RD_THEME_DEVTOOLS_WINDOW__ROOT,
  filter: import.meta.env?.RD_THEME_DEVTOOLS_WINDOW__FILTER,
  content: import.meta.env?.RD_THEME_DEVTOOLS_WINDOW__CONTENT,
  list: import.meta.env?.RD_THEME_DEVTOOLS_WINDOW__LIST,
  virtualList: import.meta.env?.RD_THEME_DEVTOOLS_WINDOW__WIRTUAL_LIST,
  aside: import.meta.env?.RD_THEME_DEVTOOLS_WINDOW__ASIDE,
  asideHeader: import.meta.env?.RD_THEME_DEVTOOLS_WINDOW__ASIDE_HEADER,
  filterButton: import.meta.env?.RD_THEME_DEVTOOLS_WINDOW__FILTER_BUTTON,
  filterOnButton: import.meta.env?.RD_THEME_DEVTOOLS_WINDOW__FILTER_ON_BUTTON,
  filterOffButton: import.meta.env?.RD_THEME_DEVTOOLS_WINDOW__FILTER_OFF_BUTTON,
}

export type DevtoolsWindowStyles = typeof devtoolsWindowStyles

export type DevtoolsWindowProps<T extends FlexElement = 'div', S extends DevtoolsWindowStyles = DevtoolsWindowStyles> = WindowProps<T, S>

export function DevtoolsWindowComponent<T extends FlexElement = 'div', S extends DevtoolsWindowStyles = DevtoolsWindowStyles> (props: DevtoolsWindowProps<T, S>) {
  const list = new Ref<HTMLDivElement>()
  const styles = useStyles(devtoolsWindowStyles, props.class)
  const { show, search, searchSlots, slots, props: devtoolsProps, systemFilter, errorFilter, anonFilter, errors } = devtoolsStoreContext.get()!

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

  const close = () => {
    viewTransition(() => {
      show.set(false)
    })
  }

  return (
    <Window {...props} class={styles.root}>
      <WindowHeader onClose={close}>
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
            <Show when={devtoolsProps.anon}>
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
            <Show when={devtoolsProps.system}>
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

export const DevtoolsWindow = import.meta.env?.RD_UI_DEVTOOLS_WINDOW
  ? import.meta.require?.(import.meta.env.RD_UI_DEVTOOLS_WINDOW).DevtoolsWindow as typeof DevtoolsWindowComponent
  : DevtoolsWindowComponent
