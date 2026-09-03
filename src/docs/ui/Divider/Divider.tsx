import { classes } from 'html-classes'

import type { HTMLStyleProps } from '../../../hooks'
import { useStyles } from '../../../hooks'
import type { ObservableProp } from '../../../types'
import { inject, injectAll } from '../../../utils'
import $styles from './Divider.module.scss'

interface DividerPros extends HTMLStyleProps<HTMLHRElement, typeof $styles> {
  vertical?: ObservableProp<boolean>
  glow?: ObservableProp<boolean>
}

export function Divider ({
  vertical,
  glow,
  children,
  ...props
}: DividerPros = {}) {
  const styles = useStyles($styles, props.class)

  const root = injectAll([
    styles.root,
    inject(vertical, vertical => vertical && styles.vertical),
    inject(glow, glow => glow && styles.glow),
  ], classes)

  if (!children) {
    return (
      <hr {...props} class={root} />
    )
  }

  return (
    <fieldset class={root}>
      <legend class={styles.legend}>
        {children}
      </legend>
    </fieldset>
  )
}
