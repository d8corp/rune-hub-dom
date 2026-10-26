import { useStyles } from '../../../hooks'
import type { ObservableProp } from '../../../types'
import { addUiCSS } from '../../../utils'
import type { BoxProps, BoxStyles } from '../../primitive'
import { Box } from '../../primitive'

if (import.meta.env?.RD_THEME_CODE) {
  addUiCSS(import.meta.env.RD_THEME_CODE, 'code')
}

export const codeStyles = {
  root: import.meta.env?.RD_THEME_CODE__ROOT,
}

export type CodeStyles = typeof codeStyles

export interface CodeProps<S extends CodeStyles = CodeStyles> extends BoxProps<'code', S & BoxStyles> {
  children?: ObservableProp<string | undefined>
}

export function CodeComponent<S extends CodeStyles> (props: CodeProps<S>) {
  const styles = useStyles(codeStyles, props.class)

  return <Box element='code' view='bordered' {...props} class={styles} />
}

export const Code = import.meta.env?.RD_UI_CODE
  ? import.meta.require?.(import.meta.env.RD_UI_CODE).Code as typeof CodeComponent
  : CodeComponent
