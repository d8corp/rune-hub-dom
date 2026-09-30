import { Show } from '../../../components'
import { Flex, Link, Scrollbar } from '../../../ui'
import { menuContext } from '../../constants'
import { hideSide, isMobile } from '../../state'
import styles from './Side.module.scss'

export function Side () {
  const itemClass = { root: styles.item, active: styles.itemSelected }
  const currentMenu = menuContext.get()

  return (
    <Flex element='aside' vertical class={styles.root}>
      <Show when={isMobile}>
        <div class={styles.background} onclick={hideSide} />
      </Show>
      <Scrollbar vertical flex gap={24} class={styles.scrollbar}>
        {currentMenu.map(({ title, children }) => (
          <Flex vertical gap={10}>
            <div class={styles.group}>{title}</div>
            <Flex vertical gap={4}>
              {children.map(props => <Link {...props} onclick={hideSide} class={itemClass} />)}
            </Flex>
          </Flex>
        ))}
      </Scrollbar>
    </Flex>
  )
}
