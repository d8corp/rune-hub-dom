import type { HTMLStyleProps } from '@/hooks'
import { useStyles } from '@/hooks'
import type { ObservableProp } from '@/types'
import { addCSS, inject } from '@/utils'

const transform = import.meta.env?.RD_THEME__TRANSFORM__TYPOGRAPHY &&
  import.meta.require?.(import.meta.env.RD_THEME__TRANSFORM__TYPOGRAPHY).default

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

function TypographyComponent ({ flex, style, ...props }: TypographyProps) {
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

export const Typography = transform
  ? transform(TypographyComponent) as typeof TypographyComponent
  : TypographyComponent
