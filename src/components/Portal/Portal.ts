import { parentContext } from '../../constants'
import { render } from '../../render'
import type { JSXElement, Parent } from '../../types'
import { Context } from '../../utils'

export interface PortalProps {
  to?: Parent
  children?: JSXElement
}

export function Portal ({ to = document.body, children }: PortalProps) {
  const context = Context.nest()
  parentContext.set(to, context)
  Context.use(() => render(children), context)
}
