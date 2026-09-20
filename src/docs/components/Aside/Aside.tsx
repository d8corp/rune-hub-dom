import { get } from 'rune-hub'

import { For } from '../../../components'
import { Flex, Link } from '../../../ui'
import { getAsideTimeline, hideAside, titleLinks } from '../../state'
import styles from './Aside.module.scss'

export function Aside () {
  return (
    <Flex element='aside' vertical class={styles.root}>
      <div class={styles.background} onclick={hideAside} />
      <Flex flex vertical gap={12} class={styles.scrollbar}>
        <div class={styles.title}>
          On this page
        </div>
        <Flex vertical gap={8} class={styles.content}>
          <For of={() => get(titleLinks)} key='id'>
            {(value) => (
              <Link
                onclick={hideAside}
                href={() => `#${value.value.id}`}
                class={styles.item}
                style={{ 'animation-timeline': () => getAsideTimeline(value.value.id) }}
              >
                {() => value.value.title}
              </Link>
            )}
          </For>
        </Flex>
      </Flex>
    </Flex>
  )
}
