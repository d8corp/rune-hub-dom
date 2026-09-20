import { persistent } from '@rune-hub/utils'
import { batch, get, raw, set } from 'rune-hub'

import { isLaptop, isMobile } from '../window'

import { viewTransition } from '../../../utils'

export interface TitleLink {
  id: string
  title?: string
}

export const theme = () => persistent<'light dark' | 'light' | 'dark'>('theme', 'light dark')
export const isShowSideMobile = () => false
export const isShowAsideDesktop = () => true
export const isShowAsideMobile = () => false
export const titleLinks = () => new Set<TitleLink>()
export const titleVariables = () => Array.from(get(titleLinks)).map(({ id }) => getAsideTimeline(id))
export const titleTimelineScope = () => get(titleVariables).join(',')

export function getAsideTimeline (id: string) {
  return `--aside-timeline-${id}`
}

export const isShowSide = () => get(isMobile) ? get(isShowSideMobile) : true
export const isShowAside = () => get(isLaptop) ? get(isShowAsideMobile) : get(isShowAsideDesktop)
export const hasTitleLinks = () => get(titleLinks).size > 1

export const hideSide = () => {
  viewTransition(() => {
    set(isShowSideMobile, false)
  })
}

export const hideAside = () => {
  viewTransition(() => {
    if (raw(isLaptop)) {
      set(isShowAsideMobile, false)
    }
  })
}

export const toggleIsShowSide = () => {
  viewTransition(() => {
    batch(() => {
      hideAside()
      set(isShowSideMobile, !raw(isShowSideMobile))
    })
  })
}

export const toggleIsShowAside = () => {
  viewTransition(() => {
    batch(() => {
      set(isShowSideMobile, false)

      if (raw(isLaptop)) {
        set(isShowAsideMobile, !raw(isShowAsideMobile))
      } else {
        set(isShowAsideDesktop, !raw(isShowAsideDesktop))
      }
    })
  })
}

export const toggleTheme = () => {
  const current = raw(theme)

  viewTransition(() => {
    if (current === 'light') {
      set(theme, 'dark')
    } else if (current === 'dark') {
      set(theme, 'light dark')
    } else {
      set(theme, 'light')
    }
  })
}

export const applyThemeEffect = () => {
  document.body.style.colorScheme = get(theme)
}
