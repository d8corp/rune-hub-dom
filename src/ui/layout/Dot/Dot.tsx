import type { HTMLStyleProps } from '../../../hooks'
import { useStyles } from '../../../hooks'

export type DotSize = 'm' | 's'
export type DotColor = 'error' | 'success' | 'warning' | 'disabled'

import { classes } from 'html-classes'

import type { ObservableProp } from '../../../types'
import { inject, injectAll } from '../../../utils'
import $styles from './Dot.module.scss'

export interface DotProps extends HTMLStyleProps<HTMLSpanElement, typeof $styles> {
  size?: ObservableProp<DotSize>
  color?: ObservableProp<DotColor>
  pulse?: ObservableProp<boolean>
}

export function Dot ({ size = 'm', color = 'warning', pulse, ...props }: DotProps) {
  const styles = useStyles($styles, props.class)

  return (
    <span
      {...props}
      class={injectAll([
        styles.root,
        inject(size, size => styles[size]),
        inject(color, color => styles[color]),
        inject(pulse, pulse => pulse && styles.pulse),
      ], classes)}
    />
  )
}
