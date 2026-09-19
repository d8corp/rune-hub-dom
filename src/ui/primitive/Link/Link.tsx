import { classes } from 'html-classes'

import { type HTMLStyleProps, useStyles } from '../../../hooks'
import type { ObservableProp } from '../../../types'
import type { LinkToParams } from '../../../utils'
import { addCSS, Context, inject, linkTo, locationURL, SystemSlot, use } from '../../../utils'

if (import.meta.env?.RD_THEME_LINK) {
  addCSS(import.meta.env.RD_THEME_LINK, 'link')
}

export const linkStyles = {
  root: import.meta.env?.RD_THEME_LINK__ROOT,
  active: import.meta.env?.RD_THEME_LINK__ACTIVE,
}

export type LinkStyles = typeof linkStyles

const CLEAR_HREF = /([?#].*)?$/

function clearHref (url: string) {
  return url.replace(CLEAR_HREF, '')
}

export const linkBaseUrlContext = new Context('')

export interface LinkProps extends HTMLStyleProps<HTMLAnchorElement, LinkStyles>, LinkToParams {
  target?: '_blank' | '_parent' | '_self' | '_top'
  exact?: boolean
  disabled?: ObservableProp<boolean>
  children?: JSX.Element
}

export function Link (props: LinkProps) {
  const styles = useStyles(linkStyles, props.class)
  const { onclick, href, scroll = 'before', scrollTo, replace, exact, ...rest } = props

  if (!href || (typeof href === 'string' && href.startsWith('http'))) {
    return (
      <a
        {...rest}
        class={styles.root}
        href={inject(rest.disabled, disabled => disabled ? '' : href)}
        rel={rest.rel ?? (href ? 'noopener noreferrer nofollow' : undefined)}
        target={rest.target ?? (href ? '_blank' : undefined)}
        onclick={onclick}
      />
    )
  }

  const baseUrl = linkBaseUrlContext.get()

  const getHref = () => {
    const result = use(href) || ''

    return result.startsWith('/') ? `${baseUrl}${result}` : result
  }

  const linkRegString = () => {
    const href = getHref()

    const prefix = href.startsWith('?')
      ? '[^?]*'
      : href.startsWith('#')
        ? '[^#]*'
        : ''

    return `^${prefix}${clearHref(href)}${exact ? '$' : ''}`
  }

  const regString = new SystemSlot(linkRegString)
  const linkReg = () => new RegExp(regString.value)
  const reg = new SystemSlot(linkReg)

  const linkClass = () => {
    return classes([
      styles.root,
      reg.value.test(locationURL.value) && styles.active,
    ])
  }

  const className = new SystemSlot(linkClass)

  function handleClick (e: MouseEvent) {
    if (use(rest.disabled)) {
      e.preventDefault()

      return
    }

    if (e.ctrlKey || e.metaKey) {
      // @ts-expect-error TODO: fix types
      return onclick?.call(this, e)
    }

    if (!linkTo(getHref(), { scroll, replace, scrollTo })) return

    e.preventDefault()

    // @ts-expect-error TODO: fix types
    onclick?.call(this, e)
  }

  return <a {...rest} class={className} href={getHref} onclick={handleClick} />
}
