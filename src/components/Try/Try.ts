import { catchContext } from '../../constants'
import type { ChildrenProps, JSXElement } from '../../types'
import { JSXNode } from '../../types'
import { Context, SystemSlot } from '../../utils'

export interface ErrorProps {
  error: unknown
  retry: () => void
}

export interface TryProps extends ChildrenProps {
  catch?: (props: ErrorProps) => JSXElement
}

export function Try (props: TryProps) {
  const errorSlot = new SystemSlot<unknown>(() => {})

  const retry = () => {
    errorSlot.set(undefined)
  }

  const tryCatch = () => !errorSlot.value ? props.children : props.catch ? props.catch({ error: errorSlot.value, retry }) : undefined
  const tryCatchSlot = new SystemSlot(tryCatch)

  const handleError = (error: unknown) => {
    errorSlot.set(error)
  }

  tryCatchSlot.on('error', () => handleError(tryCatchSlot.err))

  return new JSXNode(Context.Provider, {
    for: catchContext,
    set: handleError,
    children: tryCatchSlot,
  })
}
