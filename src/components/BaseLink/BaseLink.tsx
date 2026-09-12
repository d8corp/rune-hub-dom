import { classes } from 'html-classes'

import { type HTMLStyleProps, useStyles } from '../../hooks'
import type { LinkToParams } from '../../utils'
import { Context, linkTo, locationURL, SystemSlot, use } from '../../utils'

export const defaultLinkClass = {
  root: '',
  active: '',
}

const CLEAR_HREF = /([?#].*)?$/

function clearHref (url: string) {
  return url.replace(CLEAR_HREF, '')
}

export const linkBaseUrlContext = new Context('')

export interface LinkProps extends HTMLStyleProps<HTMLAnchorElement, typeof defaultLinkClass>, LinkToParams {
  target?: '_blank' | '_parent' | '_self' | '_top'
  exact?: boolean
  children?: JSX.Element
}

export function BaseLink (props: LinkProps) {
  const styles = useStyles(defaultLinkClass, props.class)
  const { onclick, href, scroll = 'before', scrollTo, replace, exact, ...rest } = props

  if (!href || (typeof href === 'string' && href.startsWith('http'))) {
    return (
      <a
        {...rest}
        class={styles.root}
        href={href}
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

  function createClassName () {
    const linkRegString = () => {
      const href = getHref()

      const prefix = href.startsWith('?')
        ? '[^?]*'
        : href.startsWith('#')
          ? '[^#]*'
          : ''

      return `^${prefix}${clearHref(href)}${exact ? '$' : ''}`
    }

    const linkReg = () => new RegExp(regString.value)

    const regString = new SystemSlot(linkRegString)
    const reg = new SystemSlot(linkReg)

    const linkClass = () => {
      return classes([
        styles.root,
        reg.value.test(locationURL.value) && styles.active,
      ])
    }

    return new SystemSlot(linkClass)
  }

  const className = rest.class ? createClassName() : undefined

  function handleClick (e: MouseEvent) {
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
