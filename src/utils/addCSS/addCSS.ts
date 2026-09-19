export function addCSS (css: string, marker?: string): HTMLStyleElement | null {
  if (!css || typeof document === 'undefined') return null

  const style = document.createElement('style')
  style.setAttribute('type', 'text/css')
  style.textContent = css
  document.head.appendChild(style)

  if (marker) {
    style.dataset.rd = marker
  }

  return style
}
