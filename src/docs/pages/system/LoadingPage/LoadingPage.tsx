import { Flex, Spin } from '../../../../ui'
import { Page } from '../../../ui'
import styles from './LoadingPage.scss'

export function LoadingPage () {
  return (
    <Page class={styles.root}>
      <Flex align='center' justify='center' class={styles.content}>
        <Spin />
      </Flex>
    </Page>
  )
}
