# Toggle

A toggle is a switch that lets the user turn a single option on or off. It works like a checkbox, but its state is usually applied immediately — think of a settings switch rather than a form field ticked before submitting.

The `<Toggle>` component renders a track with a sliding knob and a hidden native `<input type="checkbox">` inside, so keyboard focus, form submission and native form reset keep working.
Accessibility comes for free too — the control is focusable with `Tab`, toggled with `Space`, and exposes its `checked` / `unchecked` state to assistive technologies.

The state can be static or reactive, and the component inherits all [\\<Box>](/ui/box) and [\\<Flex>](/ui/flex) props except `children`.

**Extends: [\\<Box>](/ui/box)**

| Prop         | Type                                            | Description                                                |
|--------------|-------------------------------------------------|------------------------------------------------------------|
| **checked**  | `ObservableProp<boolean>`                       | Checked (on) state                                         |
| **disabled** | `ObservableProp<boolean>`                       | Disables user interactions and applies the disabled style  |
| **name**     | `ObservableProp<string>`                        | Form field name                                            |
| **value**    | `ObservableProp<string>`                        | Value submitted with the form when the toggle is on        |
| **class**    | `ObservableProp<string \| Partial<ToggleStyles>>` | CSS class name(s) or an object that overrides styles     |
| **inputRef** | `HTMLRef<'input'>`                              | Reference to the underlying `<input>` element              |
| **onChange** | `(checked: boolean) => void`                    | Callback fired when the toggle state changes               |

In addition to the props listed above, `<Toggle>` accepts all standard element attributes and the layout, color, size, and view props inherited from [\\<Box>](/ui/box).
By default it renders `element='label'`, `view='bordered'`, `size='s'`, and `color='primary'`.

## Basic usage
---

The simplest use case is a standalone toggle, off or on:

```tsx
//! View
//> basic
//! Code
import { rundom, Flex, Toggle } from 'rundom'

rundom(
  <Flex gap={8} wrap align='center'>
    <Toggle />
    <Toggle checked />
  </Flex>
)
```

## Label
---

`<Toggle>` itself has no label content, so pair it with a `<Flex element='label'>` and put the label next to it:

```tsx
//! View
//> label
//! Code
import { rundom, Flex, Text, Toggle } from 'rundom'

rundom(
  <Flex gap={16} wrap align='center'>
    <Flex element='label' gap={8} align='center'>
      <Toggle />
      <Text cursor='pointer'>Off</Text>
    </Flex>
    <Flex element='label' gap={8} align='center'>
      <Toggle checked />
      <Text cursor='pointer'>On</Text>
    </Flex>
  </Flex>
)
```

## Checked
---

The `checked` prop controls the state of the toggle:

- **`true` / `false`** — the on and off states.
- **Reactive value** — a `Slot` or getter updates the UI automatically whenever the value changes.

Pass a `Slot` (or a getter) to drive the state from code:

```tsx
//! View
//> checked
//! Code
import { rundom, Button, Flex, Text, Toggle } from 'rundom'
import { Slot } from 'rune-hub'

const isOn = new Slot(() => true)

rundom(
  <Flex vertical gap={8}>
    <Flex element='label' gap={8} align='center'>
      <Toggle checked={isOn} />
      <Text cursor='pointer'>Dynamic switch</Text>
    </Flex>
    <Flex gap={8}>
      <Button onclick={() => isOn.set(true)}>On</Button>
      <Button onclick={() => isOn.set(false)}>Off</Button>
    </Flex>
    <div>Current state: {() => String(isOn.value)}</div>
  </Flex>
)
```

## Disabled
---

The `disabled` prop blocks user interactions and applies the disabled style:

```tsx
//! View
//> disabled
//! Code
import { rundom, Flex, Toggle } from 'rundom'

rundom(
  <Flex vertical gap={8}>
    <Flex gap={8} align='center'>
      <Toggle disabled />
      Disabled
    </Flex>
    <Flex gap={8} align='center'>
      <Toggle checked disabled />
      Disabled and on
    </Flex>
  </Flex>
)
```

## onChange
---

Use the `onChange` callback to react to state changes. It receives the next boolean state.

When `checked` is computed from another value, pair it with `onChange`: the toggle only reads the derived state,
while `onChange` updates the source. Here the mute toggle is on while the volume is zero:

```tsx
//! View
//> onChange
//! Code
import { rundom, Flex, Text, Toggle } from 'rundom'
import { get, set, slot } from 'rune-hub'

const volume = () => 50
const muted = () => get(volume) === 0
const toggleMute = (checked: boolean) => set(volume, checked ? 0 : 50)

rundom(
  <Flex vertical gap={8}>
    <Flex element='label' gap={8} align='center'>
      <Toggle checked={slot(muted)} onChange={toggleMute} />
      <Text cursor='pointer'>Mute sound</Text>
    </Flex>
    <Text>Volume: {slot(volume)}%</Text>
  </Flex>
)
```

## class
---

Customize the styling with a regular CSS class name, or pass an object to override the styles of specific parts:
the object keys are `root` and `input`:

```tsx
//! src/index.tsx
import { rundom, Toggle } from 'rundom'

const customStyles = {
  root: 'my-toggle',
  input: 'my-toggle-input',
}

rundom(
  <Toggle class={customStyles} />
)
```

## Inheritance
---

`<Toggle>` extends [\\<Box>](/ui/box), so all Box props are available: the `color` theme and the box `size`:

```tsx
//! View
//> inherited
//! Code
import { rundom, Flex, Toggle } from 'rundom'

rundom(
  <Flex vertical gap={16}>
    <Flex gap={16} align='center' wrap>
      <Flex gap={8} align='center'><Toggle checked color='primary' />primary</Flex>
      <Flex gap={8} align='center'><Toggle checked color='secondary' />secondary</Flex>
      <Flex gap={8} align='center'><Toggle checked color='accent' />accent</Flex>
      <Flex gap={8} align='center'><Toggle checked color='success' />success</Flex>
      <Flex gap={8} align='center'><Toggle checked color='warning' />warning</Flex>
      <Flex gap={8} align='center'><Toggle checked color='danger' />danger</Flex>
    </Flex>
    <Flex gap={16} align='center' wrap>
      <Flex gap={8} align='center'><Toggle size='xs' />xs</Flex>
      <Flex gap={8} align='center'><Toggle size='m' />m</Flex>
      <Flex gap={8} align='center'><Toggle size='l' />l</Flex>
    </Flex>
  </Flex>
)
```

## Theme
---

The default styles of `<Toggle>` come from the theme and are configured with environment variables. Every variable is optional — set only the ones you need.
The toggle is a `<Box>` with `view='bordered'` and `size='s'`, so its colors and sizes come from the [Box theme](/ui/box#theme).

| Variable                      | Description                                          |
|-------------------------------|------------------------------------------------------|
| `RD_THEME_TOGGLE`             | CSS of the component that is added to the page       |
| `RD_THEME_TOGGLE__ROOT`       | Class name(s) of the toggle, always applied          |
| `RD_THEME_TOGGLE__INPUT`      | Class name(s) of the hidden input element            |

### Replacing the component

Set `RD_UI_TOGGLE` to a module alias, and `<Toggle>` will be taken from the `Toggle` export of that module.
It is handy for testing, for example, to add `data-testid` to every toggle:

```tsx
//! .env
RD_UI_TOGGLE='@theme/toggle'
//! theme/toggle.tsx
import { ToggleComponent, ToggleProps } from 'rundom'

export function Toggle (props: ToggleProps) {
  return <ToggleComponent {...props} data-testid='toggle' />
}
```

## What's Next?
---

- Explore the [\\<CheckBox>](/ui/check-box) component for independent multi-select options
- Explore the [\\<Box>](/ui/box) component to understand inherited capabilities
- Review [State Management](/state-management) for fine-grained reactivity
