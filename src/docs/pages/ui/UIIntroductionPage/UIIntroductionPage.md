# Rundom UI

`Rundom UI` is the built-in component library for [Rundom](/).
It provides layout primitives, controls, typography, and icons that share a single reactive model and a single theme.

It is not a separate framework: every component is a regular Rundom component.
Components run once, create real DOM nodes, and update only the attribute, style property, or text node that changed.
There is no virtual DOM and no re-render pass.

> **New to Rundom?** Start with the [Quick Start](/quick-start) to set up a project, then come back here for the component layer.

## Why Rundom UI
---

- **Signal-first props.** Every prop marked as `ObservableProp` accepts a plain value, a getter, or a `Slot`. Change the signal and only the affected DOM node updates.
- **One theme for everything.** Components read the same CSS variables, so colors, borders, spacing, and typography stay consistent across the whole interface.
- **Composable primitives.** Small blocks such as `Flex`, `Box`, and `Text` are designed to be combined rather than replaced.
- **Accessible defaults.** Focus states, keyboard interaction, disabled states, and reduced-motion behavior are built into the components.
- **Typed API.** Props, style overrides, and theme classes are fully typed, so mistakes are caught at compile time.

## Installation
---

Add `rundom` to your project with the package manager of your choice:

```shell
//! npm
npm i rundom
//! yarn
yarn add rundom
//! pnpm
pnpm add rundom
```

All components are exported from the package root:

```tsx
import { Button, Flex, Input, Typography } from 'rundom'
```

## Your first component
---

This small example combines a layout container, a text field, an icon, and a pair of buttons:

```tsx
//! View
//> firstComponent
//! Code
import { rundom, Button, Flex, Input, SearchIcon } from 'rundom'

rundom(
  <Flex vertical gap={12} style={{ 'max-width': '320px' }}>
    <Input placeholder="Search components" before={<SearchIcon />} />
    <Flex gap={8}>
      <Button view="filled" color="accent">
        Create
      </Button>
      <Button view="bordered">
        Cancel
      </Button>
    </Flex>
  </Flex>
)
```

`Flex` arranges the content, `Input` handles text entry, `Button` triggers actions, and `SearchIcon` decorates the field.
Each component accepts native HTML attributes in addition to its own props, so you rarely need extra wrappers.

## Reactive props
---

Props are reactive by design.
Instead of passing a static value, you can pass a function or a `Slot` and let the component update itself:

```tsx
import { Slot } from 'rune-hub'
import { rundom, Button } from 'rundom'

const saving = new Slot(() => false)

const save = async () => {
  await api.save()
}

rundom(
  <Button loading={saving} onclick={save}>
    {() => saving.value ? 'Saving...' : 'Save changes'}
  </Button>
)
```

When `loading` is a `Slot` and `onclick` returns a `Promise`, the button turns the spinner on while the promise is pending and resets it when the promise settles.
The same pattern works for every observable prop: colors, sizes, disabled state, class names, and even children.

See [State Management](/state-management) for the full reactive toolkit of `rune-hub`.

## Theming
---

The default theme supports light and dark color schemes through CSS variables and `light-dark()`.
Components read shared tokens such as `--rd__primary_background`, `--rd__root_color`, and `--color-bg`, so changing a token updates every component that uses it.

Theme styles are configured at build time with `RD_THEME_*` environment variables.
Each component page documents its own variables — the [Button theme](/ui/button#theme) section is a good complete example.

For local overrides, pass a class name or a style object through the `class` prop:

```tsx
import { rundom, Button } from 'rundom'

const styles = {
  root: 'my-button',
  accent: 'my-button-accent',
}

rundom(
  <Button class={styles} color="accent">
    Custom accent
  </Button>
)
```

## What's included
---

| Area       | Components                                                                                       |
|------------|--------------------------------------------------------------------------------------------------|
| Typography | [Typography](/ui/typography), [Markdown](/ui/markdown), [Text](/ui/text)                          |
| Layout     | [Flex](/ui/flex), [Box](/ui/box), [Divider](/ui/divider), [Scrollbar](/ui/scrollbar)              |
| Controls   | [Button](/ui/button), [CheckBox](/ui/check-box), [RadioBox](/ui/radio-box)                        |
| Inline     | [Code](/ui/code), [Link](/ui/link)                                                                |
| Icons      | 17 stroke icons — [browse the gallery](/ui/icons)                                                 |

The documentation site itself is built with these components.
The [Overview](/ui/overview) page gives you a searchable, visual index of the whole library.

## What's Next?
---

- [Overview](/ui/overview) — searchable visual index of every component
- [Icons](/ui/icons) — browse the stroke set and copy icon components
- [Button](/ui/button) — colors, sizes, loading, links, and theming
- [Typography](/ui/typography) — headings, paragraphs, lists, and rich content
- [Flex](/ui/flex) — the layout primitive behind most components
- [State Management](/state-management) — signals and fine-grained reactivity
