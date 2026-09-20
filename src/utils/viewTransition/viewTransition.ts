let ready = true
let running = false
let queue: Array<() => void> = []

export function viewTransition (fn: () => void) {
  if (import.meta.env?.RD_VIEW_TRANSITION === 'true') {
    startViewTransition(fn)
  } else {
    fn()
  }
}

export function startViewTransition (fn: () => void) {
  if (running) {
    fn()

    return
  }

  if (ready) {
    ready = false
    queue.push(fn)

    document.startViewTransition(() => {
      running = true
      queue.forEach(call => call())
      queue = []
      ready = true
      running = false
    })
  } else {
    queue.push(fn)
  }
}
