import { devtoolsStoreContext } from './hooks'

import styles from './DevtoolsButton.module.scss'

export function DevtoolsButton () {
  const { show } = devtoolsStoreContext.get()!

  return (
    <button onclick={() => show.set(true)} class={styles.root}>
      Devtools
    </button>
  )
}
