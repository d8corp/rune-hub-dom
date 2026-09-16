import { Button, Divider, Flex } from '../../../ui'
import { Code, DelayPage, Title } from '../../ui'
import {
  ComponentsExample,
  ControlFlowExample,
  CountExample,
  HelloWorldExample,
  JSXExample,
  RouterExample,
} from '../../widgets'
import styles from './UIPage.scss'

export default function UIPage () {
  return (
    <DelayPage class={styles.root}>
      <Flex padding={[40, 24]} align='center' justify='center' vertical class={styles.banner}>
        <div class={styles.content}>
          <Title title='Rundom UI' class={styles.title}>
            Rundom UI
          </Title>
          <p class={styles.description}>
            <Code glow>rundom</Code> is a lightweight frontend framework with fine-grained reactivity, JSX, and direct DOM manipulation.
          </p>
          <div class={styles.buttons}>
            <Button color='accent' style={{ width: '175px' }} element='a' size='l' href='/flex'>
              Get Started
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
