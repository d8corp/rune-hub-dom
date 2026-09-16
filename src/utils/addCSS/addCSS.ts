export function addCSS (css: string): HTMLStyleElement | null {
  if (!css || typeof document === 'undefined') return null

  const style = document.createElement('style')
  style.setAttribute('type', 'text/css')
  style.textContent = css
  document.head.appendChild(style)

  return style
}
