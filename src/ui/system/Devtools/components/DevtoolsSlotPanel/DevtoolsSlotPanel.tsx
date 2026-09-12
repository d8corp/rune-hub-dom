import { SlotStatus } from '../SlotStatus'

import { Show } from '../../../../../components'
import { CloseIcon } from '../../../../../docs/icons'
import { SystemSlot } from '../../../../../utils'
import { Flex } from '../../../../layout'
import { devtoolsStoreContext } from '../../hooks'
import styles from './DevtoolsSlotPanel.module.scss'

export function DevtoolsSlotPanel () {
  const { selected, values, ups } = devtoolsStoreContext.get()!

  const handleClose = () => {
    selected.set(undefined)
  }

  return (
    <Show when={selected}>
      <div class={styles.root}>
        <Flex gap={8} align='center'>
          <button onclick={handleClose}>
            <CloseIcon />
          </button>
          <SlotStatus slot={selected} />
          {() => selected.value?.rune.name}
        </Flex>
        <div class={styles.content}>
          <div>
            value: {() => selected.value && JSON.stringify(values.value.get(selected.value))}
          </div>
          <div>
            prev: {() => values.value && JSON.stringify(selected.value?.prev)}
          </div>
          <div>
            anon: {() => String(selected.value?.anon)}
          </div>
          <div>
            state: {() => String(selected.value?.state)}
          </div>
          <div>
            sets: {() => String(selected.value?.sets)}
          </div>
          <div>
            system: {() => selected.value ? String(selected.value instanceof SystemSlot) : undefined}
          </div>
          <div class={styles.codeBlock}>
            code:
            <pre class={styles.code}>
              {() => String(selected.value?.rune)}
            </pre>
          </div>
        </div>
      </div>
    </Show>
  )
}
