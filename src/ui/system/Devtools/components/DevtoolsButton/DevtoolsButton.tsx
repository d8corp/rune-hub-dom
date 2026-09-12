import { classes } from 'html-classes'

import { useHidden } from '../../../../../components'
import { useShow } from '../../../../../hooks'
import { devtoolsStoreContext } from '../../hooks'
import styles from './DevtoolsButton.module.scss'

export function DevtoolsButton () {
  const shown = useShow()
  const hidden = useHidden()
  const { show } = devtoolsStoreContext.get()!

  return (
    <button
      onclick={() => show.set(true)}
      class={() => classes([styles.root, shown.value && styles.show, hidden?.value && styles.hide])}
    >
      Devtools
    </button>
  )
}
