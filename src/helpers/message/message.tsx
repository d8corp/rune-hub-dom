import { Portal } from '../../components'
import { rundom } from '../../rundom'
import type { MessageProps } from '../../ui'
import { Message } from '../../ui'
import { addCSS, Ref, SystemSlot, viewTransition } from '../../utils'

addCSS(import.meta.env.RD_THEME_MESSAGES, 'messages')

class Timer {
  start?: number
  timer?: number
  destroyed = false

  constructor (private readonly callback: () => any, public delay: number = 0, autoplay?: boolean) {
    if (autoplay) {
      this.play()
    }
  }

  play () {
    if (!this.destroyed && !this.start) {
      clearTimeout(this.timer)
      this.start = Date.now()
      this.timer = setTimeout(this.end.bind(this), this.delay) as any
    }
  }

  pause () {
    if (!this.destroyed && this.start) {
      clearTimeout(this.timer)
      this.timer = undefined
      this.delay -= Date.now() - this.start
      this.start = undefined
    }
  }

  end () {
    this.callback()
    this.destroy()
  }

  destroy () {
    clearTimeout(this.timer)
    this.destroyed = true
  }
}

export const messagesRef = new Ref<HTMLDivElement>()

export const messageTimers: Set<Timer | symbol> = new Set()

export function message (text: string, { timeout = text.length / 13 + 1, type = 'info', ...props }: MessageProps = {}) {
  if (!messagesRef.value) {
    messagesRef.value = document.createElement('div')
    messagesRef.value.className = import.meta.env?.RD_THEME_MESSAGES__ROOT || 'rd_messages'
    document.body.appendChild(messagesRef.value)
  }

  const timer = timeout
    ? new Timer(destroy, timeout * 1000, !messageTimers.size)
    : Symbol('message')

  messageTimers.add(timer)

  const handleMouseenter = timer instanceof Timer
    ? (e: MouseEvent) => {
        timer.pause()
        // @ts-expect-error This
        props.onmouseenter?.(e)
      }
    : undefined

  const handleMouseleave = timer instanceof Timer
    ? (e: MouseEvent) => {
        timer.play()
        // @ts-expect-error This
        props.onmouseleave?.(e)
      }
    : undefined

  const handleClick = (e: PointerEvent) => {
    viewTransition(() => {
      destroy()
      // @ts-expect-error This
      props.onclick?.(e)
    })
  }

  const slot = new SystemSlot(() => {
    rundom(
      <Portal to={messagesRef.value}>
        <Message
          {...props}
          onclick={handleClick}
          type={type}
          timeout={timeout}
          onmouseenter={handleMouseenter}
          onmouseleave={handleMouseleave}
        >
          {text}
        </Message>
      </Portal>,
    )
  })

  slot.on()

  function destroy () {
    viewTransition(() => {
      slot.off()

      if (timer instanceof Timer) {
        timer.destroy()
      }

      if (timer) {
        messageTimers.delete(timer)
      }

      if (!messageTimers.size) {
        messagesRef.value?.remove()
        messagesRef.value = undefined
      } else {
        const next = messageTimers.values().next().value

        if (next instanceof Timer) {
          next.play()
        }
      }
    })
  }
}
