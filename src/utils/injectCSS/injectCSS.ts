import { addCSS } from '../addCSS'

export function injectCSS<T extends string> (block: string, css: string, styles: T[] = []): { [k in T | 'root']: string } {
  const result: any = {
    root: block,
  }

  for (const element of styles) {
    result[element] = element === 'root' ? block : `${block}__${element}`
  }

  const style = addCSS(css)

  if (style) {
    style.dataset.rd = block
  }

  return result
}
