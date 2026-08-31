import { Dot } from '../Dot'
import type { FlexProps } from '../Flex'
import { Flex } from '../Flex'
import { BaseMarkdown } from '../Markdown'
import { Typography } from '../Typography'

import { useStyles } from '../../../hooks'
import { use } from '../../../utils'
import $styles from './View.module.scss'

export type ViewProps = FlexProps<'div', typeof $styles>

export function View ({ title, ...props }: ViewProps) {
  const styles = useStyles($styles, props.class)

  return (
    <Flex {...props} vertical class={styles.root}>
      <Flex padding={[12, 16]} class={styles.title} gap={12} align='center'>
        <Flex gap={6}>
          <Dot color='error' />
          <Dot color='warning' />
          <Dot color='success' />
        </Flex>
        <Typography flex>
          <BaseMarkdown text={() => use(title) ?? ''} />
        </Typography>
      </Flex>
      <div class={styles.code}>
        {props.children}
      </div>
    </Flex>
  )
}
