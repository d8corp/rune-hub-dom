import { Box, Button, Divider, Flex, HtmlIcon, TypeScriptIcon, Typography } from '../../../../ui'
import { Meta, Page, Title } from '../../../ui'
import {
  ComponentsExample,
  ControlFlowExample,
  CountExample,
  HelloWorldExample,
  JSXExample,
  RouterExample,
  UIExample,
} from '../../../widgets'
import styles from './HomePage.scss'

export default function HomePage () {
  const version = import.meta.env?.RD_PACKAGE_VERSION ?? '0.0.0'

  return (
    <Page class={styles.root}>
      <Flex padding={[40, 24]} align='center' justify='center' vertical class={styles.hero}>
        <div class={styles.content}>
          <div data-glow class={styles.version}>
            <Box
              circle
              size='xxs'
              data-live
              color={version.includes('alpha') ? 'danger' : version.includes('beta') ? 'warning' : 'success'}
            />
            Rundom
            <Divider vertical />
            v{import.meta.env?.RD_PACKAGE_VERSION}
          </div>
          <Typography>
            <Title title='Rundom — Frontend Framework' class={styles.title}>
              Welcome to Rundom
            </Title>
            <p class={styles.description}>
              Lightweight frontend framework with fine-grained reactivity, JSX, and direct DOM manipulation.
            </p>
          </Typography>
          <div class={styles.buttons}>
            <Button color='accent' view='filled' style={{ width: '182px' }} element='a' size='l' href='/quick-start'>
              Get Started
            </Button>
            <Button
              data-glow
              view='bordered'
              size='l'
              element='a'
              href='/ui'
            >
              View Rundom UI
            </Button>
          </div>
          <Flex gap={18} wrap justify='center' padding={[28, 0, 0]}>
            <Meta><TypeScriptIcon />TypeScript</Meta>
            <Meta><HtmlIcon />JSX</Meta>
          </Flex>
        </div>
      </Flex>
      <Flex vertical>
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
        <Divider />
        <UIExample />
      </Flex>
    </Page>

  )
}
