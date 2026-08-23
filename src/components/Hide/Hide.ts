import type { ObservableProp } from '../../types'
import { inject } from '../../utils'

export interface HideProps {
  when: ObservableProp<any>
  children?: JSX.Element
  fallback?: JSX.Element
}

export function Hide ({ when, children, fallback = null }: HideProps) {
  return inject(when, state => state ? fallback : children)
}
