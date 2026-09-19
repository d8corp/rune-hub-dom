import { useStyles } from '../../../hooks'
import { injectCSS } from '../../../utils'
import type { FlexElement, InlineProps } from '../../primitive'
import { Inline, inlineClasses } from '../../primitive'

export const dotClasses = [...inlineClasses]

export const dotStyles = injectCSS('dot', import.meta.env?.RD_THEME_DOT, dotClasses)

export type DotStyles = typeof dotStyles

export type DotProps<T extends FlexElement = 'span', S extends DotStyles = DotStyles> = InlineProps<T, S>

export function Dot<T extends FlexElement = 'span', S extends DotStyles = DotStyles> (
  props: DotProps<T, S>,
) {
  const styles = useStyles(dotStyles, props.class)

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
