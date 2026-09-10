import { Slot } from 'rune-hub'

import { For, Show } from '../../../components'
import { Example } from '../../components'
import text from './ControlFlowExample.md'

const list = ['foo', 'bar', 'baz']

const search = new Slot(function search () { return '' })

const values = new Slot(function values () {
  return list.filter(value => {
    return value.includes(search.value)
  })
})

const found = new Slot(function found () {
  return Boolean(values.value.length)
})

const onSearch = (e: any) => {
  search.set(e.target.value)
}

const fallback = <p>Empty</p>

export function ControlFlowExample () {
  return (
    <Example description={text}>
      <input value={search} oninput={onSearch} />
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
