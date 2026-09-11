import { CloseIcon } from '../../../../docs/icons'
import { Show } from '../../../Show'
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
        <div class={styles.header}>
          <button onclick={handleClose}>
            <CloseIcon />
          </button>
          {() => selected.value && ups.value.get(selected.value) ? '🟢 ' : '⚪ '}
          {() => selected.value?.rune.name}
        </div>
        <div class={styles.content}>
          <div>
            value: {() => selected.value && JSON.stringify(values.value.get(selected.value))}
          </div>
          <div>
            prev: {() => values.value && JSON.stringify(selected.value?.prev)}
          </div>
          <pre class={styles.code}>
            {() => String(selected.value?.rune)}
          </pre>
        </div>
      </div>
    </Show>
  )
}
