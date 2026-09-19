import { addCSS } from '../addCSS'

export function injectCSS<T extends string = never> (block: string, css: string, styles: T[] = []): { [k in T | 'root']: string } {
  const root = `${import.meta.env?.RD_THEME__PREFIX ?? 'rd_'}${block}`

  const result: any = {
    root,
  }

  for (const element of styles) {
    result[element] = element === 'root' ? root : `${root}_${element}`
  }

  const style = addCSS(css)

  if (style) {
    style.dataset.rd = block
  }

  return result
}
