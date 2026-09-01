## Reactivity

Add reactive state without hooks, components or manual subscriptions. 
Just update your value and the UI follows automatically, thanks to [rune-hub](https://github.com/d8corp/rune-hub).

```tsx
//! index.tsx
import { rundom } from 'rundom'
import { slot } from 'rune-hub'

const count = () => 0
const inc = () => slot(count).value++

rundom(
  <button onclick={inc}>
    Count: {slot(count)}
  </button>
)
```
