import { set } from 'rune-hub'

export const scrolling = () => false

export const listenScrolling = () => {
  let timer: any

  document.addEventListener('scroll', () => {
    requestAnimationFrame(() => {
      document.body.style.setProperty('--scroll', document.scrollingElement?.scrollTop + 'px')
    })

    clearTimeout(timer)
    set(scrolling, true)

    timer = setTimeout(() => {
      set(scrolling, false)
    }, 100)
  })
}
