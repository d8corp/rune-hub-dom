import type { HTMLStyleProps } from '../../../hooks'
import { useStyles } from '../../../hooks'
import { addCSS } from '../../../utils'

const transform = import.meta.env?.RD_THEME__TRANSFORM__CODE &&
  import.meta.require?.(import.meta.env?.RD_THEME__TRANSFORM__CODE).default

if (import.meta.env?.RD_THEME_CODE) {
  addCSS(import.meta.env.RD_THEME_CODE, 'code')
}

export const codeStyles = {
  root: import.meta.env?.RD_THEME_CODE__ROOT,
}

export type CodeStyles = typeof codeStyles

export interface CodeProps extends HTMLStyleProps<HTMLElement, CodeStyles> {}

function CodeComponent (props: CodeProps) {
  const styles = useStyles(codeStyles, props.class)

  return <code {...props} class={styles.root} />
}

export const Code = transform ? transform(CodeComponent) : CodeComponent
