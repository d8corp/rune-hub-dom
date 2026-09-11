import { classes } from 'html-classes'

import { useShow } from '../../../../hooks'
import { useHidden } from '../../../Delay'
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
