# Dot

The `<Dot>` component renders a small inline indicator dot.
It supports multiple semantic colors, sizes, shapes, content, and interactive states.

| Prop          | Type                      | Description                                                                                                               |
|---------------|---------------------------|---------------------------------------------------------------------------------------------------------------------------|
| **class**     | `string \| DotStyles`     | Additional CSS class(es) to apply to the root element                                                                     |
| **clickable** | `ObservableProp<boolean>` | Enables a clickable style (cursor pointer). Defaults to `true` when `onclick` is provided                                 |
| **color**     | `ObservableProp<RDColor>` | Sets the dot color. Available: `'primary'`, `'accent'`, `'secondary'`, `'success'`, `'warning'`, `'danger'`, `'disabled'` |
| **size**      | `ObservableProp<RDSize>`  | Sets the dot size. Available: `'s'`, `'m'` (default), `'l'`                                                               |
| **square**    | `ObservableProp<boolean>` | Renders a square instead of a circle                                                                                      |
| **hoverable** | `ObservableProp<boolean>` | Enables a hover effect on the dot                                                                                         |

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

`<Dot>` can contain text content, numbers, or icons for inline indicators:

```tsx
//! View
//> content
//! Code
import { rundom, Dot, Flex, CloseIcon } from 'rundom'

rundom(
  <Flex gap={8} align='center' wrap>
    <Dot>1</Dot>
    <Dot>13</Dot>
    <Dot>420</Dot>
    <Dot><CloseIcon /></Dot>
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
    <Dot color='primary'>1</Dot>
    <Dot color='accent'>1</Dot>
    <Dot color='secondary'>1</Dot>
    <Dot color='success'>1</Dot>
    <Dot color='warning'>1</Dot>
    <Dot color='danger'>1</Dot>
    <Dot color='disabled'>1</Dot>
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
  <Flex gap={16} align='center' wrap>
    <Dot size='s'>1</Dot>
    <Dot size='m'>1</Dot>
    <Dot size='l'>1</Dot>
    <Dot size='l' />
    <Dot size='m' />
    <Dot size='s' />
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
  <Flex gap={16} align='center'>
    <Dot square size='s'>1</Dot>
    <Dot square size='m'>1</Dot>
    <Dot square size='l'>1</Dot>
    <Dot square size='l' />
    <Dot square size='m' />
    <Dot square size='s' />
  </Flex>
)
```

## Clickable
---

Set `clickable` to enable a clickable style (cursor pointer). When an `onclick` handler is provided without explicitly setting `clickable`, it defaults to `true` automatically. Otherwise, `clickable` defaults to `false`:

```tsx
//! View
//> clickable
//! Code
import { rundom, Dot, Flex } from 'rundom'

rundom(
  <Flex gap={8} align='center'>
    <Dot clickable />
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
    <Dot clickable color='danger' hoverable><CloseIcon /></Dot>
    <Dot clickable color='success' hoverable>Hello!</Dot>
  </Flex>
)
```

## Theme
---

The default styles of `<Dot>` come from the theme and are configured with environment variables:

| Variable                  | Description                                         |
|---------------------------|-----------------------------------------------------|
| `RD_THEME_DOT`            | CSS of the component that is added to the page      |
| `RD_THEME_DOT__ROOT`      | Class name(s) of the root element, always applied   |
| `RD_THEME_DOT__PRIMARY`   | Class name(s) applied when `color` is `'primary'`   |
| `RD_THEME_DOT__ACCENT`    | Class name(s) applied when `color` is `'accent'`    |
| `RD_THEME_DOT__SECONDARY` | Class name(s) applied when `color` is `'secondary'` |
| `RD_THEME_DOT__SUCCESS`   | Class name(s) applied when `color` is `'success'`   |
| `RD_THEME_DOT__WARNING`   | Class name(s) applied when `color` is `'warning'`   |
| `RD_THEME_DOT__DANGER`    | Class name(s) applied when `color` is `'danger'`    |
| `RD_THEME_DOT__DISABLED`  | Class name(s) applied when `color` is `'disabled'`  |
| `RD_THEME_DOT__SQUARE`    | Class name(s) applied when `square` is `true`       |
| `RD_THEME_DOT__S`         | Class name(s) applied when `size` is `'s'`          |
| `RD_THEME_DOT__M`         | Class name(s) applied when `size` is `'m'`          |
| `RD_THEME_DOT__L`         | Class name(s) applied when `size` is `'l'`          |
| `RD_THEME_DOT__HOVERABLE` | Class name(s) applied when `hoverable` is `true`    |
| `RD_THEME_DOT__CLICKABLE` | Class name(s) applied when `clickable` is `true`    |

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
