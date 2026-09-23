import { Button, Typography } from '../../../../ui'
import { Page, Title } from '../../../ui'
import styles from './NotFoundPage.scss'

export default function NotFoundPage () {
  return (
    <Page justify='center' align='center' class={styles.root}>
      <Typography>
        <Title justify='center' class={styles.h1}>404</Title>
        <h2>Page Not Found</h2>
        <p>
          The page you're looking for doesn't exist.
        </p>
        <Button color='accent' size='l' element='a' href='/'>
          Go Home
        </Button>
      </Typography>
    </Page>
  )
}
