import { classes } from 'html-classes'

import { Show, useHidden } from '../../../components'
import { useShow } from '../../../hooks'
import { Flex, Link } from '../../../ui'
import { menuContext } from '../../constants'
import { hideSide, isMobile } from '../../state'
import styles from './Side.module.scss'

export function Side () {
  const show = useShow()
  const hide = useHidden()
  const itemClass = { root: styles.item, active: styles.itemSelected }
  const currentMenu = menuContext.get()

  return (
    <Flex
      element='aside'
      vertical
      class={() => classes([
        styles.root,
        show.value && styles.show,
        hide?.value && styles.hide,
      ])}
    >
      <Show when={isMobile}>
        <div class={styles.background} onclick={hideSide} />
      </Show>
      <Flex vertical flex gap={24} class={styles.scrollbar}>
        {currentMenu.map(({ title, children }) => (
          <Flex vertical gap={10}>
            <div class={styles.group}>{title}</div>
            <Flex vertical gap={4}>
              {children.map(props => <Link {...props} onclick={hideSide} class={itemClass} />)}
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}
