import { Slot } from 'rune-hub'

import { Example } from '../../components'
import text from './CountExample.md'

const count = new Slot(() => 0)
const inc = () => count.value++

export function CountExample () {
  return (
    <Example description={text}>
      <button onclick={inc}>
        Count: {count}
      </button>
    </Example>
  )
}
