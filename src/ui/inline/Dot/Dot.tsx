import { useStyles } from '../../../hooks'
import { addCSS } from '../../../utils'
import type { FlexElement, InlineProps } from '../../primitive'
import { Inline } from '../../primitive'

if (import.meta.env?.RD_THEME_DOT) {
  addCSS(import.meta.env.RD_THEME_DOT, 'dot')
}

export const dotStyles = {
  root: import.meta.env?.RD_THEME_DOT__ROOT,
  primary: import.meta.env?.RD_THEME_DOT__PRIMARY,
  accent: import.meta.env?.RD_THEME_DOT__ACCENT,
  secondary: import.meta.env?.RD_THEME_DOT__SECONDARY,
  success: import.meta.env?.RD_THEME_DOT__SUCCESS,
  warning: import.meta.env?.RD_THEME_DOT__WARNING,
  danger: import.meta.env?.RD_THEME_DOT__DANGER,
  disabled: import.meta.env?.RD_THEME_DOT__DISABLED,
  square: import.meta.env?.RD_THEME_DOT__SQUARE,
  m: import.meta.env?.RD_THEME_DOT__M,
  s: import.meta.env?.RD_THEME_DOT__S,
  l: import.meta.env?.RD_THEME_DOT__L,
  hoverable: import.meta.env?.RD_THEME_DOT__HOVERABLE,
  clickable: import.meta.env?.RD_THEME_DOT__CLICKABLE,
}

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
