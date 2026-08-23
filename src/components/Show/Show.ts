import type { JSXElement, ObservableProp } from '../../types'
import { inject } from '../../utils'

export interface ShowProps {
  when: ObservableProp<any>
  children?: JSXElement
  fallback?: JSXElement
}

export function Show ({ when, children, fallback = null }: ShowProps): JSXElement {
  return inject(when, state => state ? children : fallback)
}
