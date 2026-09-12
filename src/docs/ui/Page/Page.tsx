import { classes } from 'html-classes'
import { get, Slot } from 'rune-hub'

import { Delay, useHidden } from '../../../components'
import { useEffect, useShow, useStyles } from '../../../hooks'
import type { FlexProps } from '../../../ui'
import { Flex } from '../../../ui'
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
  const scrolled = new Slot(function pageScrolled () { return false })

  new Slot(function scrollingEffect () {
    if (styles.show && !get(scrolling)) {
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
