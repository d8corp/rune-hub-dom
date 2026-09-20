import { slot } from 'rune-hub'

import { Hide, Show, Try } from '../../../components'
import type { ChildrenProps } from '../../../types'
import { Flex } from '../../../ui'
import { Context } from '../../../utils'
import { Aside, Side } from '../../components'
import { menuContext } from '../../constants'
import { AsideIcon, SideIcon } from '../../icons'
import { ErrorPage } from '../../pages/system/ErrorPage'
import {
  hasTitleLinks,
  isMobile,
  isShowAside,
  isShowSide,
  titleTimelineScope,
  toggleIsShowAside,
  toggleIsShowSide,
} from '../../state'
import type { MenuItem } from '../../types'
import { Page } from '../../ui'
import styles from './MenuLayout.module.scss'

export interface MenuLayoutProps extends ChildrenProps {
  menu: MenuItem[]
}

export function MenuLayout ({ children, menu }: MenuLayoutProps) {
  return (
    <Page class={styles.root} padding={[40, 24]}>
      <Flex flex gap={24} style={{ 'timeline-scope': slot(titleTimelineScope) }}>
        <Flex element='main' flex class={styles.main}>
          <Try catch={ErrorPage}>
            {children}
          </Try>
        </Flex>

        <Show when={slot(isShowSide)}>
          <Context.Provider for={menuContext} set={menu}>
            <Side />
          </Context.Provider>
        </Show>

        <Show when={slot(hasTitleLinks)}>
          <Show when={slot(isShowAside)}>
            <Aside />
          </Show>
          <Hide when={slot(isMobile)}>
            <button class={styles.asideButton} onclick={toggleIsShowAside}>
              <AsideIcon />
            </button>
          </Hide>
        </Show>
      </Flex>
      <Show when={slot(isMobile)}>
        <Flex gap={24} class={styles.buttons}>
          <button class={styles.button} onclick={toggleIsShowSide}>
            <SideIcon />
          </button>
          <Show when={slot(hasTitleLinks)}>
            <button class={styles.button} onclick={toggleIsShowAside}>
              <AsideIcon />
            </button>
          </Show>
        </Flex>
      </Show>
    </Page>
  )
}
