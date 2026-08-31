import { Hide } from '../../../components'
import type { ChildrenProps } from '../../../types'
import { isLaptop } from '../../state'
import type { ViewProps } from '../../ui'
import { Flex, Markdown, Typography, View } from '../../ui'
import styles from './Example.module.scss'

export interface ExampleProps extends ChildrenProps {
  description?: string;
  views?: ViewProps[]
}

export function Example ({ description, children, views }: ExampleProps) {
  return (
    <Flex gap={32} align='center' vertical={isLaptop} class={styles.root}>
      <Typography class={styles.description}>
        <Markdown text={description} />
      </Typography>
      <Flex vertical gap={16} class={styles.viewContainer}>
        <Hide when={!children}>
          <View title='View' class={styles.view}>
            {children}
          </View>
        </Hide>
        {views?.map(view => <View class={styles.view} {...view} />)}
      </Flex>
    </Flex>
  )
}
