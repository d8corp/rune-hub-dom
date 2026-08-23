import type { Parent } from '../../types'

export function append (parent: Parent, children: Parent) {
  if (parent instanceof Comment) {
    parent.parentElement?.insertBefore(children, parent)
  } else {
    parent.appendChild(children)
  }
}
