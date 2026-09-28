import { parentContext } from '../../constants'
import { useClear } from '../../hooks'
import { promiseCounterContext, rundom } from '../../rundom'
import type { ChildrenProps, JSXElement } from '../../types'
import { append, Content, Context, extract, remove, SystemSlot } from '../../utils'

export interface SuspenseProps extends ChildrenProps {
  fallback?: JSXElement
}

export function Suspense ({ fallback, children }: SuspenseProps) {
  const content = new Content()
  const context = Context.nest()
  const parent = parentContext.get()
  const suspensePromiseCount = () => 0
  const suspenseWaiting = () => Boolean(suspense.value)
  const suspense = new SystemSlot(suspensePromiseCount)
  const waiting = new SystemSlot(suspenseWaiting)
  let destroy = false

  useClear(() => {
    destroy = true
  })

  parentContext.set(content, context)
  promiseCounterContext.set(suspense, context)

  Context.use(() => {
    rundom(children)
  }, context)

  return () => {
    if (waiting.value) {
      return fallback
    }

    append(parent, content)

    useClear(() => {
      if (destroy) {
        remove(content)
      } else {
        extract(content)
      }
    })
  }
}
