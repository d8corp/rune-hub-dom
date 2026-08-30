import { persistent } from '@rune-hub/utils'
import { batch, Slot } from 'rune-hub'

import { isLaptop, isMobile } from '../window'

export interface TitleLink {
  id: string
  title?: string
}

export const theme = new Slot(() => persistent<'light dark' | 'light' | 'dark'>('theme', 'light dark'))
export const isShowSideMobile = new Slot(() => false)
export const isShowAsideDesktop = new Slot(() => true)
export const isShowAsideMobile = new Slot(() => false)
export const titleLinks = new Slot(() => new Set<TitleLink>())

export const isShowSide = new Slot(() => isMobile.value ? isShowSideMobile.value : true)
export const isShowAside = new Slot(() => isLaptop.value ? isShowAsideMobile.value : isShowAsideDesktop.value)
export const hasTitleLinks = new Slot(() => titleLinks.value.size > 1)

export const hideSide = () => {
  isShowSideMobile.value = false
}

export const hideAside = () => {
  if (isLaptop.raw) {
    isShowAsideMobile.value = false
  }
}

export const toggleIsShowSide = () => {
  batch(() => {
    hideAside()
    isShowSideMobile.value = !isShowSideMobile.value
  })
}

export const toggleIsShowAside = () => {
  batch(() => {
    hideSide()

    if (isLaptop.raw) {
      isShowAsideMobile.value = !isShowAsideMobile.raw
    } else {
      isShowAsideDesktop.value = !isShowAsideDesktop.raw
    }
  })
}

export const toggleTheme = () => {
  if (theme.raw === 'light') {
    theme.set('dark')
  } else if (theme.raw === 'dark') {
    theme.set('light dark')
  } else {
    theme.set('light')
  }
}

const updateTheme = () => {
  document.body.style.colorScheme = theme.raw
}

theme.on('change', updateTheme)
