import type { ErrorProps } from '../../../components'
import { Flex } from '../../../ui'
import { Button, DelayPage, Typography } from '../../ui'
import styles from './ErrorPage.scss'

export function ErrorPage ({ error, retry }: ErrorProps) {
  const errors: Error[] = []
  let currentError: Error | undefined = error instanceof Error ? error : undefined

  while (currentError) {
    errors.push(currentError)
    currentError = currentError.cause instanceof Error ? currentError.cause : undefined
  }

  return (
    <DelayPage justify='center' align='center' class={styles.root}>
      <Typography>
        <h2>Page With Error</h2>
        <p>
          The page has an error:
          <ul class={styles.list}>
            {errors.map(error => <li>{String(error)}</li>)}
          </ul>
        </p>
        <Flex gap={8} wrap>
          <Button size='l' element='a' href='/'>
            Go Home
          </Button>
          <Button view='secondary' onclick={retry}>
            Retry
          </Button>
        </Flex>
      </Typography>
    </DelayPage>
  )
}
