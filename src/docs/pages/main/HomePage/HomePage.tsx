import { Button, Code, Divider, Dot, Flex } from '../../../../ui'
import { BasePage, Title } from '../../../ui'
import {
  ComponentsExample,
  ControlFlowExample,
  CountExample,
  HelloWorldExample,
  JSXExample,
  RouterExample,
} from '../../../widgets'
import styles from './HomePage.scss'

export default function HomePage () {
  const version = import.meta.env?.RD_PACKAGE_VERSION ?? '0.0.0'

  return (
    <BasePage class={styles.root}>
      <Flex padding={[40, 24]} align='center' justify='center' vertical class={styles.banner}>
        <div class={styles.content}>
          <div data-glow class={styles.version}>
            <Dot size='s' color={version.includes('alpha') ? 'danger' : version.includes('beta') ? 'warning' : 'success'} />
            v{import.meta.env?.RD_PACKAGE_VERSION} is now available
          </div>
          <Title title='Rundom — Frontend Framework' class={styles.title}>
            Welcome to Rundom
          </Title>
          <p class={styles.description}>
            <Code data-glow class={styles.code}>rundom</Code> is a lightweight frontend framework with fine-grained reactivity, JSX, and direct DOM manipulation.
          </p>
          <div class={styles.buttons}>
            <Button color='accent' style={{ width: '182px' }} element='a' size='l' href='/quick-start'>
              Get Started
            </Button>
            <Button
              data-glow
              size='l'
              element='a'
              href='/ui'
            >
              View Rundom UI
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
    </BasePage>

  )
}
