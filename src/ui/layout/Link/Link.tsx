import { BaseLink, type LinkProps } from '../../../components'
import { useStyles } from '../../../hooks'
import $styles from './Link.module.scss'

export function Link (props: LinkProps) {
  const styles = useStyles($styles, props.class)

  return <BaseLink {...props} class={styles} />
}
