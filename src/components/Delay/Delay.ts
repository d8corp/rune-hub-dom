import { Hub, Slot, unwatch } from 'rune-hub'
import Timer from 'sync-timer'

import { parentContext } from '../../constants'
import { useOnce } from '../../hooks'
import { rundom } from '../../rundom'
import type { Ref } from '../../utils'
import { append, Content, Context, dissolve } from '../../utils'

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

    useOnce('clear', () => {
      dissolve(content)
    })
  }

  const run = () => Context.use(() => rundom(children), context)

  if (hide > 0) {
    const hideState = new Slot(() => false)
    delayContext.set(hideState, context)

    if (ref) {
      ref.value = hideState
    }

    const watcher = new Slot(run)

    useOnce('clear', () => {
      hideState.set(true)
      new Timer(() => { watcher.destroy() }, hide)
    })

    if (show > 0) {
      useContent()

      const timer = new Timer(() => {
        if (!hideState.raw) {
          watcher.on()
        }
      }, show)

      useOnce('clear', () => {
        timer.cancel()
      })
    } else {
      unwatch(() => watcher.on())
    }

    return
  }

  if (show > 0) {
    const ctx = Hub.cur?.ctx
    const listener = ctx ? () => ctx.use(run) : run
    const timer = new Timer(listener, show)
    useContent()

    useOnce('clear', () => {
      timer.cancel()
    })
  }
}
