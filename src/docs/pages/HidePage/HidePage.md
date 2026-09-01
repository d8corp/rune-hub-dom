# Hide

| Prop            | Type                          | Description                                         |
|-----------------|-------------------------------|-----------------------------------------------------|
| **when** [*](#) | `Slot<T>` \| `() => T` \| `T` | Condition to determine whether to hide the children |
| **fallback**    | `JSX.Element`                 | Element to render if the condition is met           |
| **children**    | `JSX.Element`                 | Content to render when the condition is not met     |

You can use `Hide` component to show/hide content by state.

```tsx
import { Hide } from 'rundom'
import { Slot } from 'rune-hub'

const isHidden = new Slot(() => false)

export default (
  <Hide when={isHidden}>
    <button
      onclick={() => {
        isHidden.value = true
      }}>
      Click Me
    </button>
  </Hide>
)
```
