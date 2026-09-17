import { BASE_URL } from '../../../constants'
import { BasePage } from '../../../ui'
import styles from './LoadingPage.scss'

export function LoadingPage () {
  return (
    <BasePage class={styles.root}>
      <img class={styles.spinner} width={64} height={64} src={`/${BASE_URL}/loading.svg`} />
    </BasePage>
  )
}
