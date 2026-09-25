import { SlotStatus } from '../SlotStatus'

import { Show } from '../../../../../components'
import { stringify, SystemSlot } from '../../../../../utils'
import { Button } from '../../../../block'
import { CloseIcon } from '../../../../icons'
import { Code } from '../../../../inline'
import { Flex } from '../../../../primitive'
import { devtoolsStoreContext } from '../../hooks'
import styles from './DevtoolsSlotPanel.module.scss'

export function DevtoolsSlotPanel () {
  const { selected, values, errors } = devtoolsStoreContext.get()!

  const handleClose = () => {
    selected.set(undefined)
  }

  return (
    <Show when={selected}>
      <div class={styles.root}>
        <Flex gap={8} align='center'>
          <Button data-glow data-shine size='s' onclick={handleClose}>
            <CloseIcon />
          </Button>
          <SlotStatus slot={selected} />
          {() => selected.value?.rune.name}
        </Flex>
        <div class={styles.content}>
          <div>
            value: <Code>{() => selected.value && stringify(values.value.get(selected.value))}</Code>
          </div>
          <div>
            prev: <Code>{() => values.value && stringify(selected.value?.prev)}</Code>
          </div>
          <div>
            anon: <Code>{() => String(selected.value?.anon)}</Code>
          </div>
          <div>
            state: <Code>{() => String(selected.value?.state)}</Code>
          </div>
          <div>
            sets: <Code>{() => String(selected.value?.sets)}</Code>
          </div>
          <div>
            system: <Code>{() => selected.value ? String(selected.value instanceof SystemSlot) : undefined}</Code>
          </div>
          <div>
            error: <Code>{() => selected.value && stringify(errors.value.get(selected.value))}</Code>
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
