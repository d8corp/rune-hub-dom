import { Slot } from 'rune-hub'

import { For, Show } from '../../../components'
import { Example } from '../../components'
import text from './ControlFlowExample.md'

const list = ['foo', 'bar', 'baz']

const search = new Slot(() => '')

const values = new Slot(() => {
  return list.filter(value => {
    return value.includes(search.value)
  })
})

const found = new Slot(() => {
  return Boolean(values.value.length)
})

const onSearch = (e: any) => {
  search.set(e.target.value)
}

const fallback = <p>Empty</p>

export function ControlFlowExample () {
  return (
    <Example description={text}>
      <input oninput={onSearch} />
      <Show when={found} fallback={fallback}>
        <ul>
          <For of={values}>
            {value => <li>{value}</li>}
          </For>
        </ul>
      </Show>
    </Example>
  )
}
