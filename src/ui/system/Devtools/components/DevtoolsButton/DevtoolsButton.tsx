import { classes } from 'html-classes'

import { useHidden } from '../../../../../components'
import { useShow } from '../../../../../hooks'
import { Button } from '../../../../action'
import { devtoolsStoreContext } from '../../hooks'
import styles from './DevtoolsButton.module.scss'

export function DevtoolsButton () {
  const shown = useShow()
  const hidden = useHidden()
  const { show } = devtoolsStoreContext.get()!

  return (
    <Button
      color='primary'
      onclick={() => show.set(true)}
      class={() => classes([styles.root, shown.value && styles.show, hidden?.value && styles.hide])}
    >
      Devtools
    </Button>
  )
}
