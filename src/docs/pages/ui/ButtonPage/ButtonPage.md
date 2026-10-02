# Button

The `<Button>` component provides an interactive clickable element.
It is offering color themes, sizes, shapes, fine-grained reactivity, and built-in asynchronous loading management.

**Extends: [\<Block>](/ui/block)**

| Prop         | Type                                                                                                   | Description                                                                                                        |
|--------------|--------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| **color**    | `'primary'` \| `'accent'` \| `'secondary'` \| `'success'` \| `'warning'` \| `'danger'` \| `'disabled'` | Color theme that reflects the purpose of the action, e.g. `'danger'` for destructive ones (default: `'secondary'`) |
| **size**     | `'s'` \| `'m'` \| `'l'`                                                                                | Size of the button (default: `'m'`)                                                                                |
| **loading**  | `ObservableProp<boolean>`                                                                              | Controls the loading spinner state (default: `false`)                                                              |
| **disabled** | `ObservableProp<boolean>`                                                                              | Disables user interactions and applies disabled styling                                                            |
| **square**   | `ObservableProp<boolean>`                                                                              | Creates a button with equal width and height padding                                                               |
| **circle**   | `ObservableProp<boolean>`                                                                              | Gives the button fully rounded circular or pill edges                                                              |
| **element**  | `keyof HTMLElementTagNameMap`                                                                          | Tag name to render, e.g. `'button'` or `'a'` (default: `'button'`)                                                 |
| **onclick**  | `(e: PointerEvent) => void \| Promise<void>`                                                           | Click event handler, supports asynchronous promises                                                                |
| **class**    | `ObservableProp<string \| Partial<ButtonStyles>>`                                                      | CSS class name(s) or style override object                                                                         |
| **children** | `JSX.Element`                                                                                          | Content to render inside the button                                                                                |

## onclick
---

Use the `<Button>` component with an `onclick` handler to handle user clicks:

```tsx
//! View
//> onclick
//! Code
import { rundom, Button } from 'rundom'

rundom(
  <Button onclick={() => alert('Clicked!')}>
    Click Me
  </Button>
)
```

### Async Handling

```tsx
//! View
//> onclickAsync
//! Code
import { rundom, Button } from 'rundom'
import { Slot } from 'rune-hub'

const handleSave = async () => {
  // Simulating an async operation
  await new Promise(resolve => setTimeout(resolve, 5000))
}

rundom(
  <Button onclick={handleSave}>
    Save Changes
  </Button>
)
```

### Loading State

If `loading` is a `Slot` and `onclick` returns a `Promise`, `<Button>` will automatically activate `loading` while the promise is pending and reset it when finished:

```tsx
//! View
//> onclickLoading
//! Code
import { rundom, Button } from 'rundom'
import { Slot } from 'rune-hub'

const loading = new Slot(() => false)

const handleSave = async () => {
  // Simulating an async operation
  await new Promise(resolve => setTimeout(resolve, 1500))
}

rundom(
  <div>
    <Button loading={loading} onclick={handleSave}>
      Save Changes
    </Button>
    {() => loading.value ? ' Saving...' : ''}
  </div>
)
```

## color
---

The `color` prop controls the button's visual theme:

- `'secondary'` (default): Subtle translucent background with an interactive shine highlight on hover.
- `'primary'`: Solid brand primary color.
- `'accent'`: Vibrant gradient background.
- `'success'`: Green theme for successful or confirmative actions.
- `'warning'`: Orange theme for cautionary actions.
- `'danger'`: Red theme for destructive actions.
- `'disabled'`: Muted disabled style.

```tsx
//! View
//> color
//! Code
import { rundom, Button, Flex } from 'rundom'

rundom(
  <Flex gap={8} wrap>
    <Button color="secondary">Secondary</Button>
    <Button color="primary">Primary</Button>
    <Button color="accent">Accent</Button>
    <Button color="success">Success</Button>
    <Button color="warning">Warning</Button>
    <Button color="danger">Danger</Button>
  </Flex>
)
```

## size
---

The `size` prop defines the dimensions, font size, and internal padding of the button:

- `'s'`: Compact small button (useful for inline toolbars or compact headers).
- `'m'` (default): Standard medium button.
- `'l'`: Large prominent button.

```tsx
//! View
//> size
//! Code
import { rundom, Button, Flex } from 'rundom'

rundom(
  <Flex gap={8} align="center">
    <Button size="l">Large</Button>
    <Button size="m">Medium</Button>
    <Button size="s">Small</Button>
  </Flex>
)
```

## loading
---

The `loading` prop renders a spinner inside the button.
Pass any reactive slot or getter function to control it manually.

```tsx
//! View
//> loading
//! Code
import { rundom, Button, Flex } from 'rundom'
import { Slot } from 'rune-hub'

const isLoading = new Slot(() => false)
const toggle = () => isLoading.set(!isLoading.raw)

rundom(
  <Flex gap={8} align="center">
    <Button loading={isLoading}>
      Processing...
    </Button>
    <Button onclick={toggle}>
      Toggle Spinner
    </Button>
  </Flex>
)
```

## square and circle
---

Use `square` and `circle` to customize the button shape:

- `square`: Enforces equal width and height padding, ideal for icon-only buttons.
- `circle`: Applies fully rounded circular or pill border-radius.

```tsx
//! View
//> squareCircle
//! Code
import { rundom, Button, Flex, SearchIcon } from 'rundom'

rundom(
  <Flex gap={8} align="center">
    <Button square>
      <SearchIcon />
    </Button>
    <Button circle color="accent">
      Pill Button
    </Button>
    <Button circle square>
      <SearchIcon />
    </Button>
  </Flex>
)
```

## element
---

Use the `element` prop to change the underlying HTML element. When set to `'a'`, `<Button>` behaves as a `<Link>` component with internal client-side navigation:

```tsx
//! View
//> element
//! Code
import { rundom, Button, Flex } from 'rundom'

rundom(
  <Flex gap={8}>
    <Button element="a" href="/quick-start" color="accent">
      Get Started
    </Button>
    <Button element="a" href="https://github.com/d8corp/rune-hub-dom">
      GitHub
    </Button>
  </Flex>
)
```

## disabled
---

The `disabled` prop disables pointer events and updates the visual appearance:

```tsx
//! View
//> disabled
//! Code
import { rundom, Button, Flex } from 'rundom'
import { Slot } from 'rune-hub'

const isDisabled = new Slot(() => true)
const toggle = () => isDisabled.set(!isDisabled.raw)
const handleAlert = () => alert('Clicked!')

rundom(
  <Flex gap={8} align="center">
    <Button disabled={isDisabled} onclick={handleAlert}>
      Disabled Action
    </Button>
    <Button onclick={toggle}>
      Toggle Disabled
    </Button>
  </Flex>
)
```

## class
---

You can customize the button styling using standard CSS classes or pass an object to target specific elements and states:

```tsx
//! src/index.tsx
import { rundom, Button } from 'rundom'

const customStyles = {
  root: 'my-button',
  accent: 'my-button-accent',
}

rundom(
  <Button class={customStyles} color="accent">
    Custom Theme Button
  </Button>
)
```

## What's Next?
---

- Explore the [\<Link>](/ui/link) component for anchor navigation
- Learn about [\<Flex>](/ui/flex) for arranging layout components
- Discover available [\<Icons>](/ui/icons) for button iconography
- Review [State Management](/state-management) for fine-grained reactivity
