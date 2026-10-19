# RadioBox

A radio box is a control that lets the user choose exactly one option from a group — the digital equivalent of a circle on a paper form.
Clicking it selects that option and deselects the others in the same group, which is defined by a shared `name`.

The `<RadioBox>` component renders such a control. Visually it is a small bordered circle (built on top of [\<Box>](/ui/box)) with a hidden native `<input type="radio">` inside,
so the usual browser behavior keeps working: keyboard focus, arrow-key navigation inside a group, form submission, and native form reset.
Accessibility comes for free too — the control is focusable with `Tab`, selected with `Space`, and exposes its `checked` / `unchecked` state to assistive technologies.

The state can be static or reactive, and the component inherits all [\<Box>](/ui/box) and [\<Flex>](/ui/flex) props except `children`.

**Extends: [\<Box>](/ui/box)**

| Prop         | Type                                                | Description                                                       |
|--------------|-----------------------------------------------------|-------------------------------------------------------------------|
| **checked**  | `ObservableProp<boolean>`                           | Checked state                                                     |
| **disabled** | `ObservableProp<boolean>`                           | Disables user interactions and applies the disabled style         |
| **name**     | `ObservableProp<string>`                            | Form field name shared by all radios in the group                 |
| **value**    | `ObservableProp<string>`                            | Value submitted with the form when the radio is checked           |
| **class**    | `ObservableProp<string \| Partial<RadioBoxStyles>>` | CSS class name(s) or an object that overrides styles              |
| **inputRef** | `HTMLRef<'input'>`                                  | Reference to the underlying `<input>` element                     |
| **onChange** | `(checked: boolean) => void`                        | Callback fired when the radio state changes                       |

In addition to the props listed above, `<RadioBox>` accepts all standard element attributes and the layout, color, size, and view props inherited from [\<Box>](/ui/box).
By default it renders `element='label'`, `view='bordered'`, `size='s'`, and `color='primary'`.

## Basic usage
---

The simplest use case is a standalone radio box, unchecked or checked:

```tsx
//! View
//> basic
//! Code
import { rundom, RadioBox, Flex } from 'rundom'

rundom(
  <Flex gap={8} wrap align='center'>
    <RadioBox />
    <RadioBox checked />
  </Flex>
)
```

## Label
---

`<RadioBox>` itself has no label content, so pair it with a `<Flex element='label'>` and put the label next to it:

```tsx
//! View
//> label
//! Code
import { rundom, RadioBox, Flex, Text } from 'rundom'

rundom(
  <Flex gap={8} wrap align='center'>
    <Flex element='label' gap={8} align='center'>
      <RadioBox />
      <Text cursor='pointer'>
        Unchecked
      </Text>
    </Flex>
    <Flex element='label' gap={8} align='center'>
      <RadioBox checked />
      <Text cursor='pointer'>
        Checked
      </Text>
    </Flex>
  </Flex>
)
```

## Native Form
---

When you pass a static boolean `true` to `checked` (like `<RadioBox checked />` or `<RadioBox checked={true} />`), the component sets the native `checked` attribute instead of subscribing to a reactive value.
This creates an uncontrolled radio — the browser DOM manages its state, so native form actions such as reset work as expected.

Give the radios the same `name` to make them a group, and a different `value` to submit the selected one:
the selected option is included in the submitted data, and `reset` restores the default choice:

```tsx
//! View
//> form
//! Code
import { rundom, Button, RadioBox, Flex, Text, message } from 'rundom'

rundom(
  <Flex
    element='form'
    vertical
    gap={8}
    onsubmit={(e) => {
      e.preventDefault()
      const data = new FormData(e.currentTarget)
      message(`Plan: ${data.get('plan') ?? 'none'}`)
    }}
  >
    <Flex element='label' gap={8} align='center'>
      <RadioBox checked name='plan' value='basic' />
      <Text cursor='pointer'>Basic</Text>
    </Flex>
    <Flex element='label' gap={8} align='center'>
      <RadioBox name='plan' value='pro' />
      <Text cursor='pointer'>Pro</Text>
    </Flex>
    <Flex element='label' gap={8} align='center'>
      <RadioBox name='plan' value='team' />
      <Text cursor='pointer'>Team</Text>
    </Flex>
    <Flex gap={8}>
      <Button view='filled' type='submit'>Submit</Button>
      <Button type='reset'>Reset</Button>
    </Flex>
  </Flex>
)
```

## Checked
---

The `checked` prop controls the state of the radio box. It accepts a static boolean, a `Slot`, or a getter function:
the UI updates automatically whenever the value changes.

Pass a `Slot` to drive the state from code:

```tsx
//! View
//> checked
//! Code
import { rundom, Button, RadioBox, Flex, Text } from 'rundom'
import { Slot } from 'rune-hub'

const isChecked = new Slot(() => true)

rundom(
  <Flex vertical gap={8}>
    <Flex element='label' gap={8} align='center'>
      <RadioBox checked={isChecked} />
      <Text cursor='pointer'>
        Dynamic radio box
      </Text>
    </Flex>
    <Flex gap={8}>
      <Button onclick={() => isChecked.set(true)}>True</Button>
      <Button onclick={() => isChecked.set(false)}>False</Button>
    </Flex>
    <div>Current state: {() => String(isChecked.value)}</div>
  </Flex>
)
```

## Disabled
---

The `disabled` prop blocks user interactions and applies the disabled style.
It works with both states — checked and unchecked:

```tsx
//! View
//> disabled
//! Code
import { rundom, RadioBox, Flex } from 'rundom'

rundom(
  <Flex vertical gap={8}>
    <Flex gap={8} align='center'>
      <RadioBox disabled />
      Disabled
    </Flex>
    <Flex gap={8} align='center'>
      <RadioBox checked disabled />
      Disabled and checked
    </Flex>
  </Flex>
)
```

## onChange
---

Use the `onChange` callback to react to state changes. It receives the next boolean state.

When `checked` is computed from another value, pair it with `onChange`: the radio only reads the derived state,
while `onChange` updates the source. Here the selected option is stored in one rune, and every radio derives its
state from it:

```tsx
//! View
//> onChange
//! Code
import { rundom, RadioBox, Flex, Text } from 'rundom'
import { get, set, slot } from 'rune-hub'

const plan = (): 'basic' | 'pro' => 'basic'
const isBasic = () => get(plan) === 'basic'
const isPro = () => get(plan) === 'pro'

rundom(
  <Flex vertical gap={8}>
    <Flex element='label' gap={8} align='center'>
      <RadioBox checked={isBasic} onChange={() => set(plan, 'basic')} />
      <Text cursor='pointer'>Basic</Text>
    </Flex>
    <Flex element='label' gap={8} align='center'>
      <RadioBox checked={isPro} onChange={() => set(plan, 'pro')} />
      <Text cursor='pointer'>Pro</Text>
    </Flex>
    <Text>Selected plan: {slot(plan)}</Text>
  </Flex>
)
```

## class
---

Customize the styling with a regular CSS class name, or pass an object to override the styles of specific parts and states:
the object keys are `root`, `primary`, `accent`, `success`, `warning`, `danger`, `disabled`, and `input`:

```tsx
//! src/index.tsx
import { rundom, RadioBox } from 'rundom'

const customStyles = {
  root: 'my-radio-box',
  input: 'my-radio-box-input',
}

rundom(
  <RadioBox class={customStyles} />
)
```

## Inheritance
---

`<RadioBox>` extends [\<Box>](/ui/box), so all Box props are available: the `color` theme, the box `size` and `view`, and its interaction state:

```tsx
//! View
//> inherited
//! Code
import { rundom, RadioBox, Flex } from 'rundom'

rundom(
  <Flex vertical gap={16}>
    <Flex gap={16} align='center' wrap>
      <Flex gap={8} align='center'><RadioBox checked color='primary' />primary</Flex>
      <Flex gap={8} align='center'><RadioBox checked color='accent' />accent</Flex>
      <Flex gap={8} align='center'><RadioBox checked color='success' />success</Flex>
      <Flex gap={8} align='center'><RadioBox checked color='warning' />warning</Flex>
      <Flex gap={8} align='center'><RadioBox checked color='danger' />danger</Flex>
    </Flex>
    <Flex gap={16} align='center' wrap>
      <Flex gap={8} align='center'><RadioBox size='xs' />xs</Flex>
      <Flex gap={8} align='center'><RadioBox view='dashed' />dashed</Flex>
    </Flex>
  </Flex>
)
```

## Theme
---

The default styles of `<RadioBox>` come from the theme and are configured with environment variables. Every variable is optional — set only the ones you need.
The radio box itself is a `<Box>` with `view='bordered'` and `size='s'`, so its base styles come from the [Box theme](/ui/box#theme). Note that not all RadioBox variables mirror the Box ones.

| Variable                            | Description                                                 |
|-------------------------------------|-------------------------------------------------------------|
| `RD_THEME_RADIO_BOX`                | CSS of the component that is added to the page              |
| `RD_THEME_RADIO_BOX__ROOT`          | Class name(s) of the radio box, always applied              |
| `RD_THEME_RADIO_BOX__PRIMARY`       | Class name(s) applied when `color` is `'primary'`           |
| `RD_THEME_RADIO_BOX__ACCENT`        | Class name(s) applied when `color` is `'accent'`            |
| `RD_THEME_RADIO_BOX__SUCCESS`       | Class name(s) applied when `color` is `'success'`           |
| `RD_THEME_RADIO_BOX__WARNING`       | Class name(s) applied when `color` is `'warning'`           |
| `RD_THEME_RADIO_BOX__DANGER`        | Class name(s) applied when `color` is `'danger'`            |
| `RD_THEME_RADIO_BOX__DISABLED`      | Class name(s) applied when the radio box is disabled        |
| `RD_THEME_RADIO_BOX__INPUT`         | Class name(s) of the hidden input element                   |

### Replacing the component

Set `RD_UI_RADIO_BOX` to a module alias, and `<RadioBox>` will be taken from the `RadioBox` export of that module.
It is handy for testing, for example, to add `data-testid` to every radio box:

```tsx
//! .env
RD_UI_RADIO_BOX='@theme/radio-box'
//! theme/radio-box.tsx
import { RadioBoxComponent, RadioBoxProps } from 'rundom'

export function RadioBox (props: RadioBoxProps) {
  return <RadioBoxComponent {...props} data-testid='radio-box' />
}
```

## What's Next?
---

- Explore the [\<CheckBox>](/ui/check-box) component for multiple independent choices
- Explore the [\<Box>](/ui/box) component to understand inherited capabilities
- Learn about [\<Button>](/ui/button) for form submission
- Review [State Management](/state-management) for fine-grained reactivity
