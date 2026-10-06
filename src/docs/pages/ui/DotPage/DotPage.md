# Dot

The `<Dot>` component renders a small inline indicator dot.
It supports multiple semantic colors, sizes, shapes, and interactive states.

| Prop          | Type                      | Description                                                                                                 |
|---------------|---------------------------|-------------------------------------------------------------------------------------------------------------|
| **class**     | `string`                  | Additional CSS class(es) to apply to the root element                                                       |
| **clickable** | `ObservableProp<boolean>` | Enables a clickable style (cursor pointer)                                                                  |
| **color**     | `ObservableProp<RDColor>` | Sets the dot color. Available: `primary`, `accent`, `secondary`, `success`, `warning`, `danger`, `disabled` |
| **size**      | `ObservableProp<RDSize>`  | Sets the dot size. Available: `'s'`, `'m'` (default), `'l'`                                                 |
| **square**    | `ObservableProp<boolean>` | Renders a square instead of a circle                                                                        |

In addition to the props listed above, `<Dot>` accepts all standard `<span>` element attributes such as `id`, `title`, and event handlers.

## Basic usage
---

By default, `<Dot>` renders as a small circle with the `warning` color and `'m'` size:

```tsx
//! View
//> basic
//! Code
import { rundom, Dot, Flex } from 'rundom'

rundom(
  <Flex gap={8} align='center'>
    <Dot />
    Default dot
  </Flex>
)
```

## Content
---

```tsx
//! View
//> content
//! Code
import { rundom, Dot, Flex } from 'rundom'

rundom(
  <Flex gap={8} align='center'>
    <Dot />
    Default dot
  </Flex>
)
```

## Color
---

Use the `color` prop to set the semantic color of the dot:

```tsx
//! View
//> color
//! Code
import { rundom, Dot, Flex } from 'rundom'

rundom(
  <Flex gap={8} align='center' wrap>
    <Dot color='primary' />
    <Dot color='accent' />
    <Dot color='secondary' />
    <Dot color='success' />
    <Dot color='warning' />
    <Dot color='danger' />
    <Dot color='disabled' />
  </Flex>
)
```

## Size
---

Use the `size` prop to control the dot size:

```tsx
//! View
//> size
//! Code
import { rundom, Dot, Flex } from 'rundom'

rundom(
  <Flex gap={16} align='center'>
    <Dot size='s' />
    <Dot size='m' />
    <Dot size='l' />
  </Flex>
)
```

## Square
---

Set `square` to `true` to render a square instead of a circle:

```tsx
//! View
//> square
//! Code
import { rundom, Dot, Flex } from 'rundom'

rundom(
  <Flex gap={8} align='center'>
    <Dot />
    <Dot square />
  </Flex>
)
```

## Clickable
---

Set `clickable` to enable a clickable style, and provide an `onclick` handler:

```tsx
//! View
//> clickable
//! Code
import { rundom, Dot, Flex } from 'rundom'

rundom(
  <Flex gap={8} align='center'>
    <Dot onclick={() => {}} />
    <Dot color='danger' onclick={() => {}} />
  </Flex>
)
```

## Hoverable
---

Set `hoverable` to add a hover effect to the dot:

```tsx
//! View
//> hoverable
//! Code
import { rundom, Dot, Flex } from 'rundom'

rundom(
  <Flex gap={8} align='center'>
    <Dot hoverable />
    <Dot color='success' hoverable />
  </Flex>
)
```

## Theme
---

The default styles of `<Dot>` come from the theme and are configured with environment variables:

| Variable                         | Description                                       |
|----------------------------------|---------------------------------------------------|
| `RD_THEME_DOT`                   | CSS of the component that is added to the page    |
| `RD_THEME_DOT__ROOT`             | Class name(s) of the root element, always applied |
| `RD_THEME_DOT__PRIMARY`          | Class name(s) applied when `color` is `'primary'` |
| `RD_THEME_DOT__ACCENT`           | Class name(s) applied when `color` is `'accent'`  |
| `RD_THEME_DOT__SECONDARY`        | Class name(s) applied when `color` is `'secondary'`|
| `RD_THEME_DOT__SUCCESS`          | Class name(s) applied when `color` is `'success'` |
| `RD_THEME_DOT__WARNING`          | Class name(s) applied when `color` is `'warning'` |
| `RD_THEME_DOT__DANGER`           | Class name(s) applied when `color` is `'danger'`  |
| `RD_THEME_DOT__DISABLED`         | Class name(s) applied when `color` is `'disabled'`|
| `RD_THEME_DOT__SQUARE`           | Class name(s) applied when `square` is `true`     |
| `RD_THEME_DOT__S`                | Class name(s) applied when `size` is `'s'`        |
| `RD_THEME_DOT__M`                | Class name(s) applied when `size` is `'m'`        |
| `RD_THEME_DOT__L`                | Class name(s) applied when `size` is `'l'`        |
| `RD_THEME_DOT__HOVERABLE`        | Class name(s) applied when `hoverable` is `true`  |
| `RD_THEME_DOT__CLICKABLE`        | Class name(s) applied when `clickable` is `true`  |

### Replacing the component

Set `RD_UI_DOT` to a module alias, and `<Dot>` will be taken from the `Dot` export of that module:

```tsx
//! .env
RD_UI_DOT='@theme/dot'
//! theme/dot.tsx
import { DotComponent, DotProps } from 'rundom'

export function Dot (props: DotProps) {
  return <DotComponent {...props} data-testid='dot' />
}
```

## What's Next?
---

- Learn about [\<Divider>](/ui/divider) for visual separation
- Explore the [\<Link>](/ui/link) for hyperlinks
- Discover available [\<Icons>](/ui/icons) for visual elements
