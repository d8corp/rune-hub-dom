# Show

| Prop            | Type                          | Description                                         |
|-----------------|-------------------------------|-----------------------------------------------------|
| **when** [*](#) | `Slot<T>` \| `() => T` \| `T` | Condition to determine whether to show the children |
| **fallback**    | `JSX.Element`                 | Element to render if the condition is not met       |
| **children**    | `JSX.Element`                 | Content to render when the condition is met         |

The `<Show>` component provides conditional rendering based on reactive state.
When the condition is truthy, it renders the children; otherwise, it renders the fallback content.

```tsx
//! Basic usage
import { rundom, Show } from 'rundom'
import { Slot } from 'rune-hub'

const isVisible = new Slot(() => true)
const hide = () => isVisible.set(false)

rundom(
  <Show when={isVisible}>
    <button onclick={hide}>
      Click to Hide
    </button>
  </Show>
)
```

## What's Next?
---

- Learn about the [\<Hide>](/hide) component for reversed visibility toggling
- Explore [\<For>](/for) component for rendering dynamic lists with conditional items
- Discover [\<Router>](/router) for route-based conditional rendering
- Understand [State Management](/state-management) for managing reactive conditions

