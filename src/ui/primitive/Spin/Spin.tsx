import type { StyledProps } from '../../../hooks'
import { useStyles } from '../../../hooks'
import { addCSS } from '../../../utils'
import type { BaseIconProps } from '../../icons'
import { BaseIcon } from '../../icons'

if (import.meta.env?.RD_THEME_SPIN) {
  addCSS(import.meta.env.RD_THEME_SPIN, 'spin')
}

export const spinStyles = {
  root: import.meta.env?.RD_THEME_SPIN__ROOT,
  dot: import.meta.env?.RD_THEME_SPIN__DOT,
}

const dotArray = [...new Array(Number(import.meta.env?.RD_THEME__SPIN_DOT_COUNT ?? 6))]
  .map(() => import.meta.env?.RD_THEME__SPIN_DOT || 'circle')

export type SpinStyles = typeof spinStyles

export type SpinProps = BaseIconProps & StyledProps<SpinStyles>

export function Spin (props: SpinProps) {
  const styles = useStyles(spinStyles, props.class)

  return (
    <BaseIcon viewBox={import.meta.env?.RD_THEME__SPIN_DOT_VIEW_BOX} {...props} class={styles.root}>
      {dotArray.map((Dot) => <Dot class={styles.dot} />)}
    </BaseIcon>
  )
}
