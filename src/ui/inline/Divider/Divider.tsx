import { classes } from 'html-classes'

import type { HTMLStyleProps } from '../../../hooks'
import { useStyles } from '../../../hooks'
import type { ObservableProp, RDSize } from '../../../types'
import { inject, injectAll, injectCSS } from '../../../utils'

export const dividerStyles = injectCSS('rd_divider', import.meta.env?.RD_THEME_DIVIDER, [
  'vertical',
  's',
  'm',
  'l',
])

interface DividerPros extends HTMLStyleProps<HTMLHRElement, typeof dividerStyles> {
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
