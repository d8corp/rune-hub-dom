# State Management

With [Rundom](/), you can avoid the traditional component-based approach while still having access to state management.

State management is powered by [RuneHub](https://github.com/d8corp/rune-hub)

## Slot
---

`Slot` serves as the core unit for **state**, **computed state**, and **observable effects**.
It's API similar to [TC39 Signals Proposal](https://github.com/tc39/proposal-signals).
When you place a `Slot` directly in your JSX, [Rundom](/) automatically subscribes to changes and updates the DOM.

```tsx
//! src/index.tsx
import { rundom } from 'rundom'
import { Slot } from 'rune-hub'

const count = new Slot(() => 0)
const increase = () => count.value++

rundom(
  <>
     <h1>
        Total clicks: {count}
     </h1>
     <button onclick={increase}>
        Click Me
     </button>
  </>
)
```

You can also use a function to access the state value. 
This is useful when you need to transform or format the value:

```tsx
//! src/index.tsx
import { rundom } from 'rundom'
import { Slot } from 'rune-hub'

const count = new Slot(() => 0)
const increase = () => count.value++

rundom(
  <>
    <h1>
      {() => `Total clicks: ${count.value}`}
    </h1>
    <button onclick={increase}>
      Click Me
    </button>
  </>
)
```

## Reactive Attributes
---

To bind reactive state to an HTML element attribute, use `Slot` or a function as a value of the attribute.
This creates fine-grained reactivity where only the specific property updates without re-rendering the entire component.

```tsx
//! src/index.tsx
import { rundom } from 'rundom'
import { Slot } from 'rune-hub'

const darkMode = new Slot(() => false)
const modeClass = new Slot(() => darkMode.value ? 'dark' : 'light')

const toggleMode = () => {
  darkMode.value = !darkMode.value
}

rundom(
  <div class={modeClass}>
    <button onClick={toggleMode}>
      Mode: {modeClass}
    </button>
  </div>
)
```

## Best Practices
---

**Use functions for dynamic content**: Wrap computed content in functions
```tsx
//! 👍 Good
<div>
  Price: ${() => price.value.toFixed(2)}
</div>

//! 👎 Avoid
<div>
  Price: ${price.value.toFixed(2)}
</div>
```

**Avoid creating runes in render functions**: Create runes at module level or in setup phase
```tsx
//! 👍 Good
const count = () => 0

const MyComponent = () => (
  <div>{slot(count)}</div>
)

//! 👎 Avoid
const MyComponent = () => {
  const count = () => 0
  // Creates new slot in a hub each render
  return <div>{slot(count)}</div>
}
```

**Keep slots focused**: Create separate slots for independent concerns rather than large nested objects
```tsx
//! 👍 Good
const firstName = new Slot(() => 'John')
const lastName = new Slot(() => 'Doe')

//! 👎 Avoid
const user = new Slot(() => ({
   firstName: 'John',
   lastName: 'Doe',
}))
```

**Use computed slots for derived values**: Let `rundom` handle dependency tracking automatically
```tsx
//! 👍 Good
const total = new Slot(() => price.value * quantity.value)

//! 👎 Avoid
let total = 0
const updateTotal = () => { total = price.value * quantity.value }
```

**Minimize watchers**: Use `.on()` only for side effects, not for derived values
```tsx
//! 👍 Good
const fullName = new Slot(() => `${first.value} ${last.value}`)

//! 👎 Avoid
const fullName = new Slot(() => '')
first.on(() => fullName.value = `${first.value} ${last.value}`)
```

### Common Patterns

**Loading states:**
```tsx
//! src/LoadingPattern.tsx
import { Slot } from 'rune-hub'

const isLoading = new Slot(() => false)
const data = new Slot(() => null)

const fetchData = async () => {
  isLoading.value = true
  try {
    const response = await fetch('/api/data')
    data.value = await response.json()
  } finally {
    isLoading.value = false
  }
}
```

**Toggle patterns:**
```tsx
//! src/TogglePattern.tsx
import { Slot } from 'rune-hub'

const isOpen = new Slot(() => false)
const toggle = () => isOpen.value = !isOpen.value
const open = () => isOpen.value = true
const close = () => isOpen.value = false
```

**List management:**
```tsx
//! src/ListPattern.tsx
import { Slot } from 'rune-hub'

const items = new Slot(() => ['Item 1', 'Item 2'])
const addItem = (item: string) => items.value = [...items.value, item]
const removeItem = (index: number) => {
  items.value = items.value.filter((_, i) => i !== index)
}
```

## What's Next?
---

- **[Styling](/styling)** — CSS Modules, dynamic styles, and theming patterns.
- **[Context](/context)** — Share state across components without prop drilling.
