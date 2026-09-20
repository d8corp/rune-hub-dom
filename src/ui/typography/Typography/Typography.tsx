import type { HTMLStyleProps } from '../../../hooks'
import { useStyles } from '../../../hooks'
import type { ObservableProp } from '../../../types'
import { addCSS, inject } from '../../../utils'

if (import.meta.env?.RD_THEME_TYPOGRAPHY) {
  addCSS(import.meta.env.RD_THEME_TYPOGRAPHY, 'typography')
}

export const typographyStyles = {
  root: import.meta.env.RD_THEME_TYPOGRAPHY__ROOT,
}

export type TypographyStyles = typeof typographyStyles

export interface TypographyProps extends HTMLStyleProps <HTMLDivElement, TypographyStyles> {
  flex?: ObservableProp<number | boolean>
}

export function Typography ({ flex, style, ...props }: TypographyProps) {
  const styles = useStyles(typographyStyles, props.class)

  return (
    <article
      {...props}
      style={{
        flex: inject(flex, flex => String(flex === true ? 1 : flex || '')),
        ...style,
      }}
      class={styles.root}
    />
  )
}
