import { Slot } from 'rune-hub'

import { Show } from '../components'
import { render } from '../render'

function Counter () {
  const count = new Slot(() => 0)

  const handleClick = () => {
    count.value++
  }

  return <button onclick={handleClick}>Count: {count}</button>
}

const show = new Slot(() => true)

const toggleShow = () => {
  show.value = !show.value
}

render(
  <div>
    <button onclick={toggleShow}>=</button>
    <Show when={show}>
      <Counter />
    </Show>
  </div>,
)
