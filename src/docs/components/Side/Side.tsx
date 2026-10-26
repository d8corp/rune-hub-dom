import { get, Slot, slot } from 'rune-hub'

import { For, Show } from '../../../components'
import { Flex, Input, Link, Scrollbar, SearchIcon } from '../../../ui'
import { menuContext } from '../../constants'
import { hideSide, isMobile } from '../../state'
import type { MenuItem } from '../../types'
import styles from './Side.module.scss'

export const sideSearch = () => ''

function getTitle (children: unknown) {
  return typeof children === 'string' ? children : ''
}

export function Side () {
  const itemClass = { root: styles.item, active: styles.itemSelected }
  const currentMenu = menuContext.get()

  const filteredMenu = new Slot(function filteredMenu () {
    const query = get(sideSearch).trim().toLowerCase()

    if (!query) return currentMenu

    return currentMenu.reduce<MenuItem[]>((menu, group) => {
      const children = group.children.filter(child => {
        return getTitle(child.children).toLowerCase().includes(query)
      })

      if (children.length) {
        menu.push({ title: group.title, children })
      }

      return menu
    }, [])
  })

  const hasResult = new Slot(function hasResult () {
    return Boolean(filteredMenu.value.length)
  })

  return (
    <Flex element='aside' vertical gap={16} class={styles.root}>
      <Show when={isMobile}>
        <div class={styles.background} onclick={hideSide} />
      </Show>
      <Input
        circle
        clearable
        debounce
        square='left'
        view='ghost'
        value={slot(sideSearch)}
        placeholder='Search'
        before={<SearchIcon />}
      />
      <Scrollbar vertical flex gap={24} class={styles.scrollbar}>
        <For of={filteredMenu} key='title'>
          {group => (
            <Flex vertical gap={10}>
              <div class={styles.group}>{() => group.value.title}</div>
              <Flex vertical gap={4}>
                <For of={() => group.value.children} key='href'>
                  {item => <Link {...item.value} onclick={hideSide} class={itemClass} />}
                </For>
              </Flex>
            </Flex>
          )}
        </For>
        <Show when={() => !hasResult.value}>
          <div class={styles.empty}>Nothing found</div>
        </Show>
      </Scrollbar>
    </Flex>
  )
}
