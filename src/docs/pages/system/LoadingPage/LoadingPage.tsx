import { Spin } from '../../../../ui'
import { Page } from '../../../ui'
import styles from './LoadingPage.scss'

export function LoadingPage () {
  return (
    <Page class={styles.root}>
      <Spin class={styles.spinner} />
    </Page>
  )
}
