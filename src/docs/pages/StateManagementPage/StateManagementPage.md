# State Management

With `rundom`, you can avoid the traditional component-based approach while still having access to state management.

State management is powered by [RuneHub](https://github.com/d8corp/rune-hub)

To bind state to content, use `Slot` or a function as the content.

```tsx
//! src/index.tsx
import { rundom } from 'rundom'
import { Slot } from 'rune-hub'

const count = new Slot(() => 0)
const increase = () => count.value++

rundom(
  <>
    <h1>
      Count: {count}
    </h1>
    <button onclick={increase}>
      Click Me
    </button>
  </>
)
```

To bind a state and a prop use `Slot` or a function as a value of the prop.

```tsx
//! src/index.tsx
import { rundom } from 'rundom'
import { Slot } from 'rune-hub'

const darkMode = new Slot(() => false)
const modeClass = new Slot(() => darkMode.value ? 'dark' : 'light')

const handleChange = (e: Event) => {
  darkMode.value = (e.target as HTMLInputElement).checked
}

rundom(
  <div class={modeClass}>
    <h1>
      Hello World!
    </h1>
    <label>
      <input
        type="checkbox"
        onchange={handleChange}
      />
      Dark Mode
    </label>
  </div>
)
```
