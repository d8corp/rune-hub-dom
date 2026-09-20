import { useEffect, useStyles } from '../../../hooks'
import type { FlexProps } from '../../../ui'
import { Flex } from '../../../ui'
import { Context } from '../../../utils'
import type { PageUpdatedData } from '../../hooks'
import { pageUpdated } from '../../hooks'
import $styles from './Page.module.scss'

export type PageProps = FlexProps<'div', typeof $styles>

export function Page ({ ...props }: PageProps) {
  const styles = useStyles($styles, props.class)

  const updated: PageUpdatedData = { updated: false }

  useEffect(() => {
    updated.updated = true
  })

  return (
    <Context.Provider for={pageUpdated} set={updated}>
      <Flex
        vertical
        align='stretch'
        flex
        {...props}
        class={styles.root}
      />
    </Context.Provider>
  )
}
