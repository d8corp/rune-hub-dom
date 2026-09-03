export const listenCursorPosition = () => {
  document.addEventListener('mousemove', (e: MouseEvent) => {
    document.body.style.setProperty('--cursor-x', e.clientX + 'px')
    document.body.style.setProperty('--cursor-y', e.clientY + 'px')
  })
}
