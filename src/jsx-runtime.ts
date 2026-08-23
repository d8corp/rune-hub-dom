import type { JSXType, JSXTypeProps } from './types'
import { JSXNode } from './types'

export function jsx <T extends JSXType> (type: T, props: JSXTypeProps<T>, key?: string): JSXNode<T> {
  if (key !== undefined) {
    props.key = key
  }

  return new JSXNode(type, props)
}

export const jsxs = jsx
export const Fragment = undefined
