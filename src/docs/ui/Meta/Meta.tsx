import { classes } from 'html-classes'

import type { FlexProps } from '../../../ui'
import { Flex } from '../../../ui'
import styles from './Meta.module.scss'

export type MetaProps = FlexProps

export function Meta (props: MetaProps): JSX.Element {
  return (
    <Flex {...props} class={classes([styles.root, props.class])} />
  )
}
