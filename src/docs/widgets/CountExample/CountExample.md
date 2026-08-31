## Reactivity

Add reactive state without hooks, components or manual subscriptions. 
Just update your value and the UI follows automatically, thanks to [rune-hub](https://github.com/d8corp/rune-hub).

```tsx
//! index.tsx
import { rundom } from 'rundom'
import { Slot } from 'rune-hub'

const count = new Slot(() => 0)
const inc = () => count.value++

rundom(
  <button onclick={inc}>
    Count: {count}
  </button>
)
```
