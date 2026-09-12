import { BaseLink } from '../../../components'
import { Flex } from '../../../ui'
import styles from './Footer.scss'

export function Footer () {
  return (
    <Flex element='footer' class={styles.root}>
      <Flex align='center' flex justify='between' class={styles.content}>
        © 2026 Mike&nbsp;Lysikov. MIT&nbsp;License.
        <Flex wrap gap={20}>
          <BaseLink href='https://github.com/d8corp/rundom/pulls' class={styles.link}>Pulls</BaseLink>
          <BaseLink href='https://github.com/d8corp/rundom/issues' class={styles.link}>Issues</BaseLink>
        </Flex>
      </Flex>
    </Flex>
  )
}
