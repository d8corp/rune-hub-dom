# HTML Elements

You can also bind multiple properties to different state values:

```tsx
//! src/ThemeButton.tsx
import { rundom } from 'rundom'
import { Slot } from 'rune-hub'

const isActive = new Slot(() => false)
const backgroundColor = new Slot(() => isActive.value ? '#007bff' : '#6c757d')
const textColor = new Slot(() => isActive.value ? '#ffffff' : '#cccccc')
const buttonText = new Slot(() => isActive.value ? 'Active' : 'Inactive')

const toggle = () => isActive.value = !isActive.value

rundom(
  <button
    onclick={toggle}
    style={{
      backgroundColor,
      color: textColor,
      padding: '10px 20px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    }}
  >
    {buttonText}
  </button>
)
```

## What's Next?
---

Now that you understand styling in `rundom`, explore these related topics:
