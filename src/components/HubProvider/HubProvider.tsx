import type { Hub } from 'rune-hub'

import { rundom } from '../../rundom'
import type { JSXElement } from '../../types'

export interface HubProviderProps {
  hub: Hub
  children: JSXElement
}

export function HubProvider ({ hub, children }: HubProviderProps) {
  hub.use(() => rundom(children))
}
