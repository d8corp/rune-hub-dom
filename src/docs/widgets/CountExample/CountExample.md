## Counter

This is the simplest example of counter using rundom.

```tsx
//! Code
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
