import { Slot } from 'rune-hub'

export const pageWidth = new Slot(() => window.innerWidth)

export const isLaptop = new Slot(() => pageWidth.value < 1024)
export const isMobile = new Slot(() => pageWidth.value < 802)

window.addEventListener('resize', () => {
  pageWidth.set(window.innerWidth)
})
