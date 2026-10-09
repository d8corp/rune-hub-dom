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
  flush: import.meta.env?.RD_THEME_DIVIDER__FLUSH,
  s: import.meta.env?.RD_THEME_DIVIDER__S,
  m: import.meta.env?.RD_THEME_DIVIDER__M,
  l: import.meta.env?.RD_THEME_DIVIDER__L,
}

export type DividerStyle = typeof dividerStyles

interface DividerPros extends HTMLStyleProps<'hr', DividerStyle> {
  size?: ObservableProp<RDSize>
  vertical?: ObservableProp<boolean>
  flush?: ObservableProp<boolean>
}

export function DividerComponent ({
  vertical,
  size = 'm',
  flush,
  ...props
}: DividerPros = {}) {
  const styles = useStyles(dividerStyles, props.class)

  const root = injectAll([
    styles.root,
    inject(size, size => size && styles[size]),
    inject(vertical, vertical => vertical && styles.vertical),
    inject(flush, flush => flush && styles.flush),
  ], classes)

  return <hr {...props} class={root} />
}

export const Divider = import.meta.env?.RD_UI_DIVIDER
  ? import.meta.require?.(import.meta.env.RD_UI_DIVIDER).Divider as typeof DividerComponent
  : DividerComponent
