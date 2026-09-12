import { slot } from 'rune-hub'

import { Delay, Hide, Show, Try } from '../../../components'
import type { ChildrenProps } from '../../../types'
import { Flex } from '../../../ui'
import { Aside, Side } from '../../components'
import { AsideIcon, SideIcon } from '../../icons'
import { ErrorPage } from '../../pages/ErrorPage'
import {
  hasTitleLinks,
  isMobile,
  isShowAside,
  isShowSide,
  titleTimelineScope,
  toggleIsShowAside,
  toggleIsShowSide,
} from '../../state'
import { DelayPage } from '../../ui'
import styles from './MenuLayout.module.scss'

export function MenuLayout ({ children }: ChildrenProps) {
  return (
    <DelayPage class={styles.root} padding={[40, 24]}>
      <Flex flex gap={24} style={{ 'timeline-scope': slot(titleTimelineScope) }}>
        <Flex element='main' flex class={styles.main}>
          <Try catch={ErrorPage}>
            {children}
          </Try>
        </Flex>

        <Show when={slot(isShowSide)}>
          <Delay hide={200}>
            <Side />
          </Delay>
        </Show>

        <Show when={slot(hasTitleLinks)}>
          <Show when={slot(isShowAside)}>
            <Delay hide={100}>
              <Aside />
            </Delay>
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
    </DelayPage>
  )
}
