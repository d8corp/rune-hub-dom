import { classes } from 'html-classes'

import type { HTMLStyleProps } from '../../../hooks'
import { useStyles } from '../../../hooks'
import type { ObservableProp, RDSize } from '../../../types'
import { addCSS, inject, injectAll } from '../../../utils'

if (import.meta.env?.RD_THEME_DIVIDER) {
  addCSS(import.meta.env.RD_THEME_DIVIDER, 'divider')
}

export const dividerStyles = {
  root: import.meta.env?.RD_THEME_DIVIDER__ROOT,
  vertical: import.meta.env?.RD_THEME_DIVIDER__VERTICAL,
  s: import.meta.env?.RD_THEME_DIVIDER__S,
  m: import.meta.env?.RD_THEME_DIVIDER__M,
  l: import.meta.env?.RD_THEME_DIVIDER__L,
}

export type DividerStyle = typeof dividerStyles

interface DividerPros extends HTMLStyleProps<HTMLHRElement, DividerStyle> {
  size?: ObservableProp<RDSize>
  vertical?: ObservableProp<boolean>
}

export function Divider ({
  vertical,
  size = 'm',
  ...props
}: DividerPros = {}) {
  const styles = useStyles(dividerStyles, props.class)

  const root = injectAll([
    styles.root,
    inject(size, size => size && styles[size]),
    inject(vertical, vertical => vertical && styles.vertical),
  ], classes)

  return <hr {...props} class={root} />
}
