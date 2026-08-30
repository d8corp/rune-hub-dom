import { classes } from 'html-classes'
import { Slot } from 'rune-hub'

import type { FlexProps } from '../Flex'
import { Flex } from '../Flex'

import { Delay, useHidden } from '../../../components'
import { useEffect, useShow, useStyles } from '../../../hooks'
import { Context } from '../../../utils'
import type { PageUpdatedData } from '../../hooks'
import { pageUpdated, usePageUpdated } from '../../hooks'
import { scrolling } from '../../state'
import $styles from './Page.module.scss'

export type PageProps = FlexProps<'div', typeof $styles>

export interface DelayPageProps extends PageProps {
  show?: number
  hide?: number
}

export function DelayPage ({
  show = usePageUpdated() ? 200 : 0,
  hide = 200,
  ...props
}: DelayPageProps = {}) {
  return (
    <Delay hide={hide} show={show}>
      <Page {...props} />
    </Delay>
  )
}

export function Page ({ ...props }: PageProps) {
  const styles = useStyles($styles, props.class)
  const show = useShow()
  const hidden = useHidden()
  const scrolled = new Slot(() => false)

  new Slot(() => {
    if (styles.show && !scrolling.value) {
      scrolled.value = true
    }
  }).on()

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
        class={() => classes([
          styles.root,
          show.value && styles.show,
          hidden?.value && styles.hide,
          !scrolled.value && styles.scrolling,
        ])}
      />
    </Context.Provider>
  )
}
