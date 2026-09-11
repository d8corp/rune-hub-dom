import type { Slot } from 'rune-hub'
import { Hub, unwatch } from 'rune-hub'
import Timer from 'sync-timer'

import { parentContext } from '../../constants'
import { useClear } from '../../hooks'
import { rundom } from '../../rundom'
import type { Ref } from '../../utils'
import { append, Content, Context, dissolve, SystemSlot } from '../../utils'

export const delayContext = new Context<undefined | Slot<boolean>>(undefined)

export function useHidden (): undefined | Slot<boolean> {
  return delayContext.get()
}

export interface DelayProps {
  show?: number
  hide?: number
  ref?: Ref<Slot<boolean>>
  children?: JSX.Element
}

export function Delay ({ show = 0, hide = 0, ref, children }: DelayProps) {
  if (show < 1 && hide < 1) {
    rundom(children)

    return
  }

  const context = Context.nest()

  function useContent () {
    const content = new Content()
    const parent = parentContext.get()

    append(parent, content)
    parentContext.set(content, context)

    useClear(() => {
      dissolve(content)
    })
  }

  const delayContent = () => Context.use(() => rundom(children), context)

  if (hide > 0) {
    const delayHide = () => false
    const hideSlot = new SystemSlot(delayHide)

    delayContext.set(hideSlot, context)

    if (ref) {
      ref.value = hideSlot
    }

    const watcher = new SystemSlot(delayContent)

    useClear(() => {
      hideSlot.set(true)
      new Timer(() => { watcher.destroy() }, hide)
    })

    if (show > 0) {
      useContent()

      const timer = new Timer(() => {
        if (!hideSlot.raw) {
          watcher.on()
        }
      }, show)

      useClear(() => {
        timer.cancel()
      })
    } else {
      unwatch(() => watcher.on())
    }

    return
  }

  if (show > 0) {
    const ctx = Hub.ctx
    const listener = ctx ? () => ctx.use(delayContent) : delayContent
    const timer = new Timer(listener, show)
    useContent()

    useClear(() => {
      timer.cancel()
    })
  }
}
