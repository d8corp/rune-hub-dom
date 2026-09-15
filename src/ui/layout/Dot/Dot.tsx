import type { FlexElement } from '../Flex'
import type { InlineProps, InlineStyles } from '../Inline'
import { Inline } from '../Inline'

import { useStyles } from '../../../hooks'
import $styles from './Dot.module.scss'

export type DotStyles = typeof $styles & InlineStyles

export type DotProps<T extends FlexElement = 'span', S extends DotStyles = DotStyles> = InlineProps<T, S>

export function Dot<T extends FlexElement = 'span', S extends DotStyles = DotStyles> (
  props: DotProps<T, S>,
) {
  const styles = useStyles($styles, props.class)

  return (
    <Inline
      element='span'
      align='center'
      justify='center'
      {...props as InlineProps<T, S>}
      class={styles}
    />
  )
}
