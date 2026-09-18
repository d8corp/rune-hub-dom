import { slot } from 'rune-hub'

import { Hide } from '../../../components'
import type { ChildrenProps } from '../../../types'
import { Flex } from '../../../ui'
import { isLaptop } from '../../state'
import type { ViewProps } from '../../ui'
import { Markdown, Typography, View } from '../../ui'
import styles from './Example.module.scss'

export interface ExampleProps extends ChildrenProps {
  description?: string;
  views?: ViewProps[]
}

export function Example ({ description, children, views }: ExampleProps) {
  return (
    <Flex padding={[32, 0]}>
      <Flex gap={32} align='center' vertical={slot(isLaptop)} class={styles.wrapper}>
        <Typography class={styles.description}>
          <Markdown text={description} />
        </Typography>
        <Flex vertical gap={16} class={styles.viewContainer}>
          <Hide when={!children}>
            <View title='Example' class={styles.view}>
              {children}
            </View>
          </Hide>
          {views?.map(view => <View class={styles.view} {...view} />)}
        </Flex>
      </Flex>
    </Flex>
  )
}
