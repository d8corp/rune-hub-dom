import { get, set } from 'rune-hub'

export const pageWidth = () => window.innerWidth

export const isLaptop = () => get(pageWidth) < 1024
export const isMobile = () => get(pageWidth) < 802
export const isSmallMobile = () => get(pageWidth) < 420

window.addEventListener('resize', () => {
  set(pageWidth, window.innerWidth)
})
