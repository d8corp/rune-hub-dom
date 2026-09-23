import { classes } from 'html-classes'
import { raw, Slot, update } from 'rune-hub'

import { Show } from '../../../components'
import type { HTMLStyleProps } from '../../../hooks'
import { useClear, useStyles } from '../../../hooks'
import type { ObservableProp } from '../../../types'
import { Link } from '../../../ui'
import { use } from '../../../utils'
import { LinkIcon } from '../../icons'
import type { TitleLink } from '../../state'
import { getAsideTimeline, titleLinks } from '../../state'
import { slugify } from '../../utils'
import $styles from './Title.module.scss'

const linkSize: Record<1 | 2 | 3 | 4 | 5 | 6, number> = {
  1: 32,
  2: 24,
  3: 14,
  4: 12,
  5: 12,
  6: 12,
}

let updateLinks: symbol

const updateTitleLinks = () => {
  const id = updateLinks = Symbol('')

  queueMicrotask(() => {
    if (id === updateLinks) {
      update(titleLinks)
    }
  })
}

export interface TitleProps extends HTMLStyleProps<HTMLHeadingElement, typeof $styles> {
  h?: 1 | 2 | 3 | 4 | 5 | 6
  title?: string
  subtitle?: ObservableProp<string>
  link?: boolean
  id?: string
}

export function Title ({
  h = 1,
  title,
  subtitle,
  children = title,
  link,
  id = title && link ? slugify(title) : undefined,
  ...props
}: TitleProps = {}) {
  const styles = useStyles($styles, props.class)
  const showSubtitle = subtitle ? new Slot(function showSubtitle () { return Boolean(use(subtitle)) }) : null

  if (h === 1 && title !== undefined) {
    document.title = title
  }

  if (id) {
    const link: TitleLink = { id, title }
    raw(titleLinks).add(link)

    useClear(() => {
      raw(titleLinks).delete(link)
      updateTitleLinks()
    })

    updateTitleLinks()
  }

  const H = `h${h}`

  return (
    <H
      {...props}
      id={id}
      style={{
        'view-timeline': h === 1 ? id && getAsideTimeline(id) : '',
        ...props.style,
      }}
      class={() => classes([
        styles.root,
        title && link && styles.withLink,
      ])}
    >
      {children}
      {title && link && (
        <Link class={styles.link} href={`#${slugify(title)}`}><LinkIcon size={linkSize[h]} /></Link>
      )}
      <Show when={showSubtitle}>
        <div class={styles.subTitle}>
          {subtitle}
        </div>
      </Show>
    </H>
  )
}
