import { Button, Code, DelayPage, Divider, Dot, Flex, Title } from '../../ui'
import {
  ComponentsExample,
  ControlFlowExample,
  CountExample,
  HelloWorldExample,
  JSXExample,
  RouterExample,
} from '../../widgets'
import styles from './HomePage.scss'

export default function HomePage () {
  const version = process.env.INNETJS_PACKAGE_VERSION ?? '0.0.0'

  return (
    <DelayPage class={styles.root}>
      <Flex padding={[40, 24]} align='center' justify='center' vertical class={styles.banner}>
        <div class={styles.content}>
          <div class={styles.version}>
            <Dot pulse size='s' color={version.includes('alpha') ? 'error' : version.includes('beta') ? 'warning' : 'success'} />
            v{process.env.INNETJS_PACKAGE_VERSION} is now available
          </div>
          <Title title='Rundom — Frontend Framework' class={styles.title}>
            Welcome to Rundom
          </Title>
          <p class={styles.description}>
            <Code glow>rundom</Code> is a lightweight frontend framework with fine-grained reactivity, JSX, and direct DOM manipulation.
          </p>
          <div class={styles.buttons}>
            <Button element='a' size='l' href='/quick-start'>
              Get Started
            </Button>
            <Button
              view='glow'
              size='l'
              element='a'
              href='https://github.com/d8corp/rundom'
              target='_blank'
            >
              View on GitHub
            </Button>
          </div>
        </div>
      </Flex>
      <Flex vertical gap={64} padding={[80, 24]} align='center' class={styles.section}>
        <HelloWorldExample />
        <Divider />
        <JSXExample />
        <Divider />
        <ComponentsExample />
        <Divider />
        <CountExample />
        <Divider />
        <ControlFlowExample />
        <Divider />
        <RouterExample />
      </Flex>
    </DelayPage>

  )
}
