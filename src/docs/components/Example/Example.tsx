import type { ChildrenProps } from '../../../types'
import { isLaptop } from '../../state'
import { Flex, Markdown, Typography, View } from '../../ui'
import styles from './Example.module.scss'

export interface ExampleProps extends ChildrenProps {
  description?: string;
}

export function Example ({ description, children }: ExampleProps) {
  return (
    <Flex gap={32} align='center' vertical={isLaptop} class={styles.root}>
      <Typography class={styles.description}>
        <Markdown text={description} />
      </Typography>
      <View title='View' class={styles.view}>
        {children}
      </View>
    </Flex>
  )
}
