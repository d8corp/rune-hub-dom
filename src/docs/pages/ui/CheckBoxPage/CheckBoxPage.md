# CheckBox

A checkbox is a control that lets the user switch a single option on or off — the digital equivalent of ticking a box on a paper form.
Clicking it toggles between **checked** and **unchecked**, and every checkbox is independent: unlike a radio group, selecting one does not deselect the others.

The `<CheckBox>` component renders such a control. Visually it is a small bordered box (built on top of [\<Box>](/ui/box)) with a hidden native `<input type="checkbox">` inside,
so the usual browser behavior keeps working: keyboard focus, form submission, and native form reset.
Accessibility comes for free too — the control is focusable with `Tab`, toggled with `Space`, and exposes its `checked` / `unchecked` state to assistive technologies.

Beyond the two normal states, `<CheckBox>` also supports an **indeterminate** `null` state — useful for a "Select All" control that currently represents a partial selection.
The state can be static or reactive, and the component inherits all [\<Box>](/ui/box) and [\<Flex>](/ui/flex) props except `children`.

**Extends: [\<Box>](/ui/box)**

| Prop         | Type                                                | Description                                                                  |
|--------------|-----------------------------------------------------|------------------------------------------------------------------------------|
| **checked**  | `ObservableProp<boolean \| null>`                   | Checked state: `true`, `false`, or `null` (indeterminate)                    |
| **disabled** | `ObservableProp<boolean>`                           | Disables user interactions and applies the disabled style                    |
| **name**     | `ObservableProp<string>`                            | Form field name                                                              |
| **value**    | `ObservableProp<string>`                            | Value submitted with the form when the checkbox is checked                   |
| **class**    | `ObservableProp<string \| Partial<CheckBoxStyles>>` | CSS class name(s) or an object that overrides styles                         |
| **inputRef** | `HTMLRef<'input'>`                                  | Reference to the underlying `<input>` element                                |
| **onChange** | `(checked: boolean) => void`                        | Callback fired when the checkbox state changes                               |

In addition to the props listed above, `<CheckBox>` accepts all standard element attributes and the layout, color, size, and view props inherited from [\<Box>](/ui/box).
By default it renders `element='label'`, `view='bordered'`, `size='s'`, and `color='primary'`.

## Basic usage
---

The simplest use case is a standalone checkbox, unchecked or checked:

```tsx
//! View
//> basic
//! Code
import { rundom, CheckBox, Flex } from 'rundom'

rundom(
  <Flex gap={8} wrap align='center'>
    <CheckBox />
    <CheckBox checked />
  </Flex>
)
```

## Label
---

`<CheckBox>` itself has no label content, so pair it with a `<Flex element='label'>` and put the label next to it:

```tsx
//! View
//> label
//! Code
import { rundom, CheckBox, Flex, Text } from 'rundom'

rundom(
  <Flex gap={8} wrap align='center'>
    <Flex element='label' gap={8} align='center'>
      <CheckBox />
      <Text cursor='pointer'>
        Unchecked
      </Text>
    </Flex>
    <Flex element='label' gap={8} align='center'>
      <CheckBox checked />
      <Text cursor='pointer'>
        Checked
      </Text>
    </Flex>
  </Flex>
)
```

## Native Form
---

When you pass a static boolean `true` to `checked` (like `<CheckBox checked />` or `<CheckBox checked={true} />`), the component sets the native `checked` attribute instead of subscribing to a reactive value.
This creates an uncontrolled checkbox — the browser DOM manages its state, so native form actions such as reset work as expected.

And because a real `<input type="checkbox">` is rendered, `name` and `value` are submitted with the form like any other checkbox.
The example combines both: subscription is checked by default and restores its state on `reset`, while both values are included in the submitted data:

```tsx
//! View
//> form
//! Code
import { rundom, Button, CheckBox, Flex, Text, message } from 'rundom'

rundom(
  <Flex
    element='form'
    vertical
    gap={8}
    onsubmit={(e) => {
      e.preventDefault()
      const data = new FormData(e.currentTarget)
      message(`offer: ${data.get('offer') ?? 'no'}, subscribe: ${data.get('subscribe') ?? 'no'}`)
    }}
  >
    <Flex element='label' gap={8} align='center'>
      <CheckBox name='offer' value='accepted' />
      <Text cursor='pointer'>I accept the terms of the offer</Text>
    </Flex>
    <Flex element='label' gap={8} align='center'>
      <CheckBox checked name='subscribe' value='yes' />
      <Text cursor='pointer'>Subscribe to the newsletter</Text>
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

The `checked` prop controls the state of the checkbox and accepts three values:

- **`true` / `false`** — the normal checked and unchecked states.
- **`null`** — the indeterminate state: a filled marker without a checkmark.
- **Reactive value** — a `Slot` or getter updates the UI automatically whenever the value changes.

Pass a `Slot` (or a getter) to drive the state from code:

```tsx
//! View
//> checked
//! Code
import { rundom, Button, CheckBox, Flex, Text } from 'rundom'
import { Slot } from 'rune-hub'

const isChecked = new Slot<boolean | null>(() => true)

rundom(
  <Flex vertical gap={8}>
    <Flex element='label' gap={8} align='center'>
      <CheckBox checked={isChecked} />
      <Text cursor='pointer'>
        Dynamic checkbox
      </Text>
    </Flex>
    <Flex gap={8}>
      <Button onclick={() => isChecked.set(true)}>True</Button>
      <Button onclick={() => isChecked.set(null)}>Null</Button>
      <Button onclick={() => isChecked.set(false)}>False</Button>
    </Flex>
    <div>Current state: {() => String(isChecked.value)}</div>
  </Flex>
)
```

## Disabled
---

The `disabled` prop blocks user interactions and applies the disabled style.
It works with all three states: `true`, `false`, and `null`:

```tsx
//! View
//> disabled
//! Code
import { rundom, CheckBox, Flex } from 'rundom'

rundom(
  <Flex vertical gap={8}>
    <Flex gap={8} align='center'>
      <CheckBox disabled />
      Disabled
    </Flex>
    <Flex gap={8} align='center'>
      <CheckBox checked disabled />
      Disabled and checked
    </Flex>
    <Flex gap={8} align='center'>
      <CheckBox checked={null} disabled />
      Disabled and indeterminate
    </Flex>
  </Flex>
)
```

## onChange
---

Use the `onChange` callback to react to state changes. It receives the next boolean state.

When `checked` is computed from another value, pair it with `onChange`: the checkbox only reads the derived state,
while `onChange` updates the source. Here the mute checkbox is checked while the volume is zero:

```tsx
//! View
//> onChange
//! Code
import { rundom, CheckBox, Flex, Text } from 'rundom'
import { get, set, slot } from 'rune-hub'

const volume = () => 50
const muted = () => get(volume) === 0
const toggleMute = (checked: boolean) => set(volume, checked ? 0 : 50)

rundom(
  <Flex vertical gap={8}>
    <Flex element='label' gap={8} align='center'>
      <CheckBox checked={slot(muted)} onChange={toggleMute} />
      <Text cursor='pointer'>Mute sound</Text>
    </Flex>
    <Text>Volume: {slot(volume)}%</Text>
  </Flex>
)
```

## Indeterminate
---

A common use case for the indeterminate state is a "Select All" checkbox that reflects the state of its children:

```tsx
//! View
//> selectAll
//! Code
import { rundom, CheckBox, Flex, Text } from 'rundom'
import { Slot } from 'rune-hub'

const selectAll = new Slot<boolean | null>(() => false)
const option1 = new Slot(() => false)
const option2 = new Slot(() => false)
const option3 = new Slot(() => false)

const handleSelectAll = (checked: boolean) => {
  selectAll.set(checked)
  option1.set(checked)
  option2.set(checked)
  option3.set(checked)
}

const updateSelectAll = () => {
  const values = [option1.value, option2.value, option3.value]
  const allChecked = values.every(v => v)
  const noneChecked = values.every(v => !v)

  selectAll.set(allChecked || noneChecked ? allChecked : null)
}

rundom(
  <Flex vertical gap={8}>
    <Flex element='label' gap={8} align='center'>
      <CheckBox checked={selectAll} onChange={handleSelectAll} />
      <Text cursor='pointer' weight='bold'>Select All</Text>
    </Flex>
    <Flex vertical gap={4} style={{ 'margin-left': '24px' }}>
      <Flex element='label' gap={8} align='center'>
        <CheckBox checked={option1} onChange={updateSelectAll} />
        <Text cursor='pointer'>Option 1</Text>
      </Flex>
      <Flex element='label' gap={8} align='center'>
        <CheckBox checked={option2} onChange={updateSelectAll} />
        <Text cursor='pointer'>Option 2</Text>
      </Flex>
      <Flex element='label' gap={8} align='center'>
        <CheckBox checked={option3} onChange={updateSelectAll} />
        <Text cursor='pointer'>Option 3</Text>
      </Flex>
    </Flex>
  </Flex>
)
```

## class
---

Customize the styling with a regular CSS class name, or pass an object to override the styles of specific parts and states:
the object keys are `root`, `primary`, `accent`, `success`, `warning`, `danger`, `disabled`, `indeterminate`, and `input`:

```tsx
//! src/index.tsx
import { rundom, CheckBox } from 'rundom'

const customStyles = {
  root: 'my-check-box',
  input: 'my-check-box-input',
}

rundom(
  <CheckBox class={customStyles} />
)
```

## Inheritance
---

`<CheckBox>` extends [\<Box>](/ui/box), so all Box props are available: the `color` theme, the box `size` and `view`, and its interaction state:

```tsx
//! View
//> inherited
//! Code
import { rundom, CheckBox, Flex } from 'rundom'

rundom(
  <Flex vertical gap={16}>
    <Flex gap={16} align='center' wrap>
      <Flex gap={8} align='center'><CheckBox checked color='primary' />primary</Flex>
      <Flex gap={8} align='center'><CheckBox checked color='secondary' />secondary</Flex>
      <Flex gap={8} align='center'><CheckBox checked color='accent' />accent</Flex>
      <Flex gap={8} align='center'><CheckBox checked color='success' />success</Flex>
      <Flex gap={8} align='center'><CheckBox checked color='warning' />warning</Flex>
      <Flex gap={8} align='center'><CheckBox checked color='danger' />danger</Flex>
    </Flex>
    <Flex gap={16} align='center' wrap>
      <Flex gap={8} align='center'><CheckBox size='xs' />xs</Flex>
      <Flex gap={8} align='center'><CheckBox view='dashed' />dashed</Flex>
    </Flex>
  </Flex>
)
```

## Theme
---

The default styles of `<CheckBox>` come from the theme and are configured with environment variables. Every variable is optional — set only the ones you need.
The checkbox itself is a `<Box>` with `view='bordered'` and `size='s'`, so its base styles come from the [Box theme](/ui/box#theme). Note that not all CheckBox variables mirror the Box ones.

| Variable                            | Description                                                 |
|-------------------------------------|-------------------------------------------------------------|
| `RD_THEME_CHECK_BOX`                 | CSS of the component that is added to the page              |
| `RD_THEME_CHECK_BOX__ROOT`           | Class name(s) of the checkbox, always applied               |
| `RD_THEME_CHECK_BOX__PRIMARY`        | Class name(s) applied when `color` is `'primary'`           |
| `RD_THEME_CHECK_BOX__SECONDARY`      | Class name(s) applied when `color` is `'secondary'`         |
| `RD_THEME_CHECK_BOX__ACCENT`         | Class name(s) applied when `color` is `'accent'`            |
| `RD_THEME_CHECK_BOX__SUCCESS`        | Class name(s) applied when `color` is `'success'`           |
| `RD_THEME_CHECK_BOX__WARNING`        | Class name(s) applied when `color` is `'warning'`           |
| `RD_THEME_CHECK_BOX__DANGER`         | Class name(s) applied when `color` is `'danger'`            |
| `RD_THEME_CHECK_BOX__DISABLED`       | Class name(s) applied when the checkbox is disabled         |
| `RD_THEME_CHECK_BOX__INPUT`          | Class name(s) of the hidden input element                   |
| `RD_THEME_CHECK_BOX__INDETERMINATE`  | Class name(s) applied when `checked` is `null`              |

### Replacing the component

Set `RD_UI_CHECK_BOX` to a module alias, and `<CheckBox>` will be taken from the `CheckBox` export of that module.
It is handy for testing, for example, to add `data-testid` to every checkbox:

```tsx
//! .env
RD_UI_CHECK_BOX='@theme/check-box'
//! theme/check-box.tsx
import { CheckBoxComponent, CheckBoxProps } from 'rundom'

export function CheckBox (props: CheckBoxProps) {
  return <CheckBoxComponent {...props} data-testid='check-box' />
}
```

## What's Next?
---

- Explore the [\<Box>](/ui/box) component to understand inherited capabilities
- Learn about [\<Button>](/ui/button) for form submission
- Review [State Management](/state-management) for fine-grained reactivity
