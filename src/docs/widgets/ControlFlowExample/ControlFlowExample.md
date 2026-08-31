## Control Flow

Use built-in components like [\<For>](/for) and [\<Show>](/show) to manage conditional rendering, loops, and dynamic layouts natively in JSX.

```tsx
//! index.tsx
import { rundom, Show, For } from 'rundom'
import { search, found, values } from './store.ts'

const onSearch = e => search.set(e.target.value)

const fallback = <p>Empty</p>

rundom(
  <>
    <input oninput={onSearch} />
    <Show when={found} fallback={fallback}>
      <ul>
        <For of={values}>
          {value => <li>{value}</li>}
        </For>
      </ul>
    </Show>
  </>
)

//! store.ts
import { Slot } from 'rune-hub'

const list = [
  'foo',
  'bar',
  'baz',
]

export const search = new Slot(() => '')

export const values = new Slot(() => {
  return list.filter(value => {
    return value.includes(search.value)
  })
})

export const found = new Slot(() => {
  return Boolean(values.value.length)
})
```
