import { JSXNode } from '../../types'

export interface PipeProps {
  deep?: number
  children: (children: JSX.Element, deep: number) => JSX.Element
}

export function Pipe ({ deep = 0, children }: PipeProps) {
  return children(new JSXNode(Pipe, { deep: deep + 1, children }), deep)
}
