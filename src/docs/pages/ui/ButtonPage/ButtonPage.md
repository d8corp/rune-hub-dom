# Button

The `<Button>` component is an interactive clickable element.
It offers color themes, sizes, shapes, fine-grained reactivity, and built-in management of asynchronous loading.

**Extends: [\<Block>](/ui/block)**

| Prop         | Type                                                                                                   | Description                                                                                                        |
|--------------|--------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| **children** | `JSX.Element`                                                                                          | Content to render inside the button                                                                                |
| **circle**   | `ObservableProp<boolean>`                                                                              | Gives the button fully rounded edges: a circle with `square`, a pill otherwise (default: `false`)                  |
| **class**    | `ObservableProp<string \| Partial<ButtonStyles>>`                                                      | CSS class name(s) or an object that overrides styles                                                               |
| **color**    | `'primary'` \| `'accent'` \| `'secondary'` \| `'success'` \| `'warning'` \| `'danger'` \| `'disabled'` | Color theme that reflects the purpose of the action, e.g. `'danger'` for destructive ones (default: `'secondary'`) |
| **disabled** | `ObservableProp<boolean>`                                                                              | Disables user interactions and applies the disabled style (default: `false`)                                       |
| **element**  | `keyof HTMLElementTagNameMap`                                                                          | Tag name to render, e.g. `'button'` or `'a'` (default: `'button'`)                                                 |
| **href**     | `string`                                                                                               | Link address, used when `element` is `'a'`                                                                         |
| **loading**  | `ObservableProp<boolean>`                                                                              | Shows the loading spinner (default: `false`)                                                                       |
| **size**     | `'s'` \| `'m'` \| `'l'`                                                                                | Size of the button (default: `'m'`)                                                                                |
| **square**   | `ObservableProp<boolean>`                                                                              | Makes the button's width and height equal, ideal for icon-only buttons (default: `false`)                          |
| **onclick**  | `(e: PointerEvent) => void \| Promise<void>`                                                           | Click handler. May be asynchronous                                                                                 |

## onclick
---

Pass a function to `onclick` to handle clicks:

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

### Async handling

The handler can return a `Promise`, so you can use `async` functions directly:

```tsx
//! View
//> onclickAsync
//! Code
import { rundom, Button } from 'rundom'

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

### Loading state

If `loading` is a `Slot` and `onclick` returns a `Promise`, `<Button>` turns `loading` on while the promise is pending and resets it when the promise settles:

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

The `color` prop describes the purpose of the action.
The exact colors and effects depend on the active theme, so choose a value by meaning rather than by appearance:

- `'secondary'` (default): a regular action that doesn't need special emphasis, e.g. "Cancel" or "Back".
- `'primary'`: the main action in a view, e.g. "Save" or "Continue".
- `'accent'`: a promoted action that should stand out even more than the primary one, e.g. a call to action like "Get Started".
- `'success'`: an action that confirms or completes something, e.g. "Approve" or "Done".
- `'warning'`: an action that requires caution but is not destructive, e.g. "Reset filters".
- `'danger'`: a destructive or irreversible action, e.g. "Delete" or "Remove account".
- `'disabled'`: an action that is currently unavailable.

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

The `size` prop sets the dimensions, font size, and padding of the button:

- `'s'`: compact button, useful for toolbars and dense layouts.
- `'m'` (default): standard button.
- `'l'`: large, prominent button.

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
To control it manually, pass any reactive `Slot` or getter function:

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

Use `square` and `circle` to change the shape of the button:

- `square`: equal width and height, ideal for icon-only buttons.
- `circle`: fully rounded edges. Combined with `square` it makes a circle, on its own it makes a pill.

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

Use the `element` prop to change the rendered HTML tag.
With `element="a"`, `<Button>` works like the [\<Link>](/ui/link) component: pass `href`, and internal links use client-side navigation.

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

The `disabled` prop blocks user interactions and applies the disabled style.
It is reactive, so you can switch it at any time:

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

Customize the styling with a regular CSS class name, or pass an object to override the styles of specific parts and states of the button.
The object keys are `root`, `primary`, `accent`, `secondary`, `success`, `warning`, `danger`, `disabled`, `square`, `circle`, `loading`, `spin`, `s`, `m` and `l`:

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

## Theme
---

The default styles of `<Button>` come from the theme and are configured with environment variables, similar to tokens.
The theme sets them at build time, so you don't need to change the component.
The `class` prop overrides them for a particular button.

| Variable                         | Description                                                                          |
|----------------------------------|--------------------------------------------------------------------------------------|
| `RD_THEME_BUTTON`                | CSS of the component that is added to the page                                       |
| `RD_THEME_BUTTON__ROOT`          | Class name(s) of the button itself, always applied                                   |
| `RD_THEME_BUTTON__PRIMARY`       | Applied when `color` is `'primary'`                                                  |
| `RD_THEME_BUTTON__ACCENT`        | Applied when `color` is `'accent'`                                                   |
| `RD_THEME_BUTTON__SECONDARY`     | Applied when `color` is `'secondary'`                                                |
| `RD_THEME_BUTTON__SUCCESS`       | Applied when `color` is `'success'`                                                  |
| `RD_THEME_BUTTON__WARNING`       | Applied when `color` is `'warning'`                                                  |
| `RD_THEME_BUTTON__DANGER`        | Applied when `color` is `'danger'`                                                   |
| `RD_THEME_BUTTON__DISABLED`      | Applied when `color` is `'disabled'` or the button is disabled                       |
| `RD_THEME_BUTTON__S`             | Applied when `size` is `'s'`                                                         |
| `RD_THEME_BUTTON__M`             | Applied when `size` is `'m'`                                                         |
| `RD_THEME_BUTTON__L`             | Applied when `size` is `'l'`                                                         |
| `RD_THEME_BUTTON__SQUARE`        | Applied when `square` is enabled                                                     |
| `RD_THEME_BUTTON__CIRCLE`        | Applied when `circle` is enabled                                                     |
| `RD_THEME_BUTTON__LOADING`       | Applied while `loading` is `true`                                                    |
| `RD_THEME_BUTTON__SPIN`          | Class name(s) of the loading spinner                                                 |

Each variable is optional. Set only the ones you need, for example, minimal styles with a base class for all buttons and a class for the primary color:

```bash
//! .env
RD_THEME_BUTTON='.my-button{padding:8px 16px;border:0;border-radius:4px;cursor:pointer}.my-button-primary{background:#06f;color:#fff}'
RD_THEME_BUTTON__ROOT=my-button
RD_THEME_BUTTON__PRIMARY=my-button-primary
```

### Replacing the component

Set `RD_UI_BUTTON` to a module alias, and `<Button>` will be taken from the `Button` export of that module.
It is handy for testing, for example, to add `data-testid` to every button:

```tsx
//! .env
RD_UI_BUTTON='@theme/button'
//! theme/button.tsx
import { ButtonComponent, ButtonProps } from 'rundom'

export function Button (props: ButtonProps) {
  return <ButtonComponent {...props} data-testid="button" />
}
```

## What's Next?
---

- Explore the [\<Link>](/ui/link) component for anchor navigation
- Learn about [\<Flex>](/ui/flex) for arranging layout components
- Discover available [\<Icons>](/ui/icons) for button iconography
- Review [State Management](/state-management) for fine-grained reactivity
