import { Slot } from 'rune-hub'

export const scrolling = new Slot(() => false)

export const listenScrolling = () => {
  let timer: any

  document.addEventListener('scroll', () => {
    requestAnimationFrame(() => {
      document.body.style.setProperty('--scroll', document.scrollingElement?.scrollTop + 'px')
    })

    clearTimeout(timer)
    scrolling.set(true)

    timer = setTimeout(() => {
      scrolling.set(false)
    }, 100)
  })
}
