import { Page } from '../../../ui'
import styles from './LoadingPage.scss'

export function LoadingPage () {
  return (
    <Page class={styles.root}>
      <img class={styles.spinner} width={64} height={64} src={`${import.meta.env?.RD_BASE_URL || ''}/loading.svg`} />
    </Page>
  )
}
