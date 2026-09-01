import { slot } from 'rune-hub'

import { Example } from '../../components'
import text from './CountExample.md'

const count = () => 0
const inc = () => slot(count).value++

export function CountExample () {
  return (
    <Example description={text}>
      <button onclick={inc}>
        Count: {slot(count)}
      </button>
    </Example>
  )
}
