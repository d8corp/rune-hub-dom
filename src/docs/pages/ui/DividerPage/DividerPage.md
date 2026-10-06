# Divider

The `<Divider>` component is used to visually separate content sections.
It supports horizontal and vertical orientations, configurable size, and an option to remove the default margins.

| Prop         | Type                      | Description                                                                                    |
|--------------|---------------------------|------------------------------------------------------------------------------------------------|
| **class**    | `string \| DividerStyle`  | Additional CSS class(es) to apply to the root element                                          |
| **flush**    | `ObservableProp<boolean>` | When `true`, removes the default margins so the divider reaches the edges of its container     |
| **size**     | `ObservableProp<RDSize>`  | Sets the divider size. Available values: `'s'` (small), `'m'` (medium, default), `'l'` (large) |
| **vertical** | `ObservableProp<boolean>` | When `true`, renders a vertical divider                                                        |

In addition to the props listed above, `<Divider>` accepts all standard `<hr>` element attributes such as `id`, `title`, and event handlers.

## Basic usage
---

By default, `<Divider>` renders as a horizontal `<hr>` element:

```tsx
//! View
//> basic
//! Code
import { rundom, Divider, Flex } from 'rundom'

rundom(
  <Flex vertical gap={8}>
    Content above
    <Divider />
    Content below
  </Flex>
)
```

## Size
---

Use the `size` prop to control the thickness of the divider:

- `'s'` — small
- `'m'` — medium (default)
- `'l'` — large

```tsx
//! View
//> size
//! Code
import { rundom, Divider, Flex } from 'rundom'

rundom(
  <Flex vertical align='stretch'>
    Small divider
    <Divider size='s' />
    Medium divider (default)
    <Divider size='m' />
    Large divider
    <Divider size='l' />
  </Flex>
)
```

## Vertical
---

Set `vertical` to `true` to render a vertical divider:

```tsx
//! View
//> vertical
//! Code
import { rundom, Divider, Flex } from 'rundom'

rundom(
  <Flex gap={16} align='center'>
    Left
    <Divider vertical />
    Right
  </Flex>
)
```

## Flush
---

By default, the divider has margins.
Set `flush` to `true` to remove them, so the divider reaches the edges of its container:

```tsx
//! View
//> flush
//! Code
import { rundom, Divider, Flex } from 'rundom'

rundom(
  <Flex vertical>
    <Divider flush />
    <Flex gap={8}>
      Vertical
      <Divider vertical flush />
      flush
      <Divider vertical />
      not
      <Divider vertical />
      flush
    </Flex>
    <Divider flush />
  </Flex>
)
```

## Theme
---

The default styles of `<Divider>` come from the theme and are configured with environment variables:

| Variable                          | Description                                       |
|-----------------------------------|---------------------------------------------------|
| `RD_THEME_DIVIDER`                | CSS of the component that is added to the page    |
| `RD_THEME_DIVIDER__ROOT`          | Class name(s) of the root element, always applied |
| `RD_THEME_DIVIDER__VERTICAL`      | Class name(s) applied when `vertical` is `true`   |
| `RD_THEME_DIVIDER__FLUSH`         | Class name(s) applied when `flush` is `true`      |
| `RD_THEME_DIVIDER__S`             | Class name(s) applied when `size` is `'s'`        |
| `RD_THEME_DIVIDER__M`             | Class name(s) applied when `size` is `'m'`        |
| `RD_THEME_DIVIDER__L`             | Class name(s) applied when `size` is `'l'`        |

### Replacing the component

Set `RD_UI_DIVIDER` to a module alias, and `<Divider>` will be taken from the `Divider` export of that module:

```tsx
//! .env
RD_UI_DIVIDER='@theme/divider'
//! theme/divider.tsx
import { DividerComponent, DividerProps } from 'rundom'

export function Divider (props: DividerProps) {
  return <DividerComponent {...props} data-testid='divider' />
}
```

## What's Next?
---

- Explore the [\<Flex>](/ui/flex) component for layout arrangements
- Learn about [\<Section>](/ui/section) for grouping content
- Learn about [\<Title>](/ui/title) for headings
- Discover available [\<Icons>](/ui/icons) for visual elements
