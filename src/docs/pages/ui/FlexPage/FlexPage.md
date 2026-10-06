# Flex

The `<Flex>` component is a layout primitive that renders a flex container.
It supports alignment, justification, gap, wrapping, direction, padding, and more.

| Prop         | Type                                                                                                         | Description                                                               |
|--------------|--------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------|
| **align**    | `ObservableProp<'start' \| 'center' \| 'end' \| 'stretch' \| 'baseline'>`                                    | Sets `align-items` on the flex container                                  |
| **class**    | `string`                                                                                                     | Additional CSS class(es) to apply to the root element                     |
| **element**  | `FlexElement`                                                                                                | HTML tag to render as the root element (default: `'div'`)                 |
| **flex**     | `ObservableProp<number \| boolean>`                                                                          | Sets `flex` on the container. `true` becomes `1`                          |
| **gap**      | `ObservableProp<number \| [number, number]>`                                                                 | Sets `gap`. A number means a single value, an array is `row` and `column` |
| **inline**   | `ObservableProp<boolean>`                                                                                    | Uses `display: inline-flex` when `true`                                   |
| **justify**  | `ObservableProp<'start' \| 'center' \| 'end' \| 'between' \| 'around'>`                                      | Sets `justify-content` on the flex container                              |
| **padding**  | `ObservableProp<number \| [number, number] \| [number, number, number] \| [number, number, number, number]>` | Sets `padding` in pixels                                                  |
| **reverse**  | `ObservableProp<boolean>`                                                                                    | Reverses the flex direction                                               |
| **style**    | `HTMLStyleProp`                                                                                              | Inline styles to apply to the root element                                |
| **vertical** | `ObservableProp<boolean>`                                                                                    | Sets `flex-direction: column` when `true`                                 |
| **wrap**     | `ObservableProp<boolean>`                                                                                    | Enables `flex-wrap: wrap`                                                 |

In addition to the props listed above, `<Flex>` accepts all standard `<div>` element attributes such as `class`, `style`, `id`, `title`, and event handlers.

## Align
---

The `align` prop controls cross-axis alignment via `align-items`:

- `start` — items align to the start of the cross axis
- `center` — items are centered along the cross axis
- `end` — items align to the end of the cross axis
- `stretch` — items stretch to fill the container
- `baseline` — items align by their text baseline

```tsx
//! View
//> align
//! Code
import { rundom, Flex } from 'rundom'

rundom(
  <Flex vertical gap={8} align='stretch' style={{ height: '80px', border: '1px dashed #444' }}>
    <div style={{ background: 'var(--background)', padding: '4px 8px' }}>start</div>
    <div style={{ background: 'var(--background)', padding: '4px 8px' }}>center</div>
    <div style={{ background: 'var(--background)', padding: '4px 8px' }}>end</div>
    <div style={{ background: 'var(--background)', padding: '4px 8px' }}>stretch</div>
    <div style={{ background: 'var(--background)', padding: '4px 8px' }}>baseline</div>
  </Flex>
)
```

## Flex
---

Set `flex` on a child `<Flex>` to make it expand and fill available space:

```tsx
//! View
//> flex
//! Code
import { rundom, Flex } from 'rundom'

rundom(
  <Flex gap={8}>
    <Flex flex style={{ background: 'var(--background)', padding: '4px 8px' }}>flex (expands)</Flex>
    <div style={{ background: 'var(--background)', padding: '4px 8px' }}>fixed</div>
  </Flex>
)
```

## Gap
---

The `gap` prop sets the space between children:

- A number applies the same gap horizontally and vertically
- An array `[row, column]` applies separate row and column gaps

```tsx
//! View
//> gap
//! Code
import { rundom, Flex } from 'rundom'

rundom(
  <Flex vertical gap={16}>
    <Flex gap={8}>
      <div style={{ background: 'var(--background)', padding: '4px 8px' }}>gap=8</div>
      <div style={{ background: 'var(--background)', padding: '4px 8px' }}>gap=8</div>
    </Flex>
    <Flex gap={[8, 24]}>
      <div style={{ background: 'var(--background)', padding: '4px 8px' }}>gap=[8,24]</div>
      <div style={{ background: 'var(--background)', padding: '4px 8px' }}>gap=[8,24]</div>
    </Flex>
  </Flex>
)
```

## Inline
---

Set `inline` to render the container as `display: inline-flex` instead of `display: flex`:

```tsx
//! View
//> inline
//! Code
import { rundom, Flex } from 'rundom'

rundom(
  <Flex inline gap={8}>
    <div style={{ background: 'var(--background)', padding: '4px 8px' }}>inline flex 1</div>
    <div style={{ background: 'var(--background)', padding: '4px 8px' }}>inline flex 2</div>
  </Flex>
)
```

## Justify
---

The `justify` prop controls main-axis alignment via `justify-content`:

- `start` — items packed toward the start
- `center` — items centered
- `end` — items packed toward the end
- `between` — items evenly distributed with space between
- `around` — items evenly distributed with space around

```tsx
//! View
//> justify
//! Code
import { rundom, Flex } from 'rundom'

rundom(
  <Flex gap={8} justify='around' style={{ border: '1px dashed #444' }}>
    <div style={{ background: 'var(--background)', padding: '4px 8px' }}>1</div>
    <div style={{ background: 'var(--background)', padding: '4px 8px' }}>2</div>
    <div style={{ background: 'var(--background)', padding: '4px 8px' }}>3</div>
  </Flex>
)
```

## Padding
---

The `padding` prop sets the container padding in pixels.
It accepts a single number or an array with 1–4 values (like CSS shorthand):

```tsx
//! View
//> padding
//! Code
import { rundom, Flex, Divider } from 'rundom'

rundom(
  <Flex vertical gap={8}>
    <Divider />
    <Flex padding={16} style={{ background: 'var(--background)' }}>
      padding=16
    </Flex>
    <Flex padding={[8, 16]} style={{ background: 'var(--background)' }}>
      padding=[8,16]
    </Flex>
    <Flex padding={[8, 16, 8, 16]} style={{ background: 'var(--background)' }}>
      padding=[8,16,8,16]
    </Flex>
  </Flex>
)
```

## Reverse
---

The `reverse` prop reverses the flex direction. Combined with `vertical`, it renders children in reverse column order:

```tsx
//! View
//> reverse
//! Code
import { rundom, Flex } from 'rundom'

rundom(
  <Flex vertical reverse gap={8}>
    <div style={{ background: 'var(--background)', padding: '4px 8px' }}>Last</div>
    <div style={{ background: 'var(--background)', padding: '4px 8px' }}>Middle</div>
    <div style={{ background: 'var(--background)', padding: '4px 8px' }}>First</div>
  </Flex>
)
```

## Vertical
---

By default, `<Flex>` lays out children in a row.
Set `vertical` to arrange them in a column:

```tsx
//! View
//> vertical
//! Code
import { rundom, Flex } from 'rundom'

rundom(
  <Flex vertical gap={8}>
    <div style={{ background: 'var(--background)', padding: '4px 8px' }}>Item 1</div>
    <div style={{ background: 'var(--background)', padding: '4px 8px' }}>Item 2</div>
    <div style={{ background: 'var(--background)', padding: '4px 8px' }}>Item 3</div>
  </Flex>
)
```

## Wrap
---

The `wrap` prop enables multi-line flex layout using `flex-wrap: wrap`:

```tsx
//! View
//> wrap
//! Code
import { rundom, Flex } from 'rundom'

rundom(
  <Flex wrap gap={8} style={{ width: '180px' }}>
    <div style={{ background: 'var(--background)', padding: '4px 8px' }}>1</div>
    <div style={{ background: 'var(--background)', padding: '4px 8px' }}>2</div>
    <div style={{ background: 'var(--background)', padding: '4px 8px' }}>3</div>
    <div style={{ background: 'var(--background)', padding: '4px 8px' }}>4</div>
    <div style={{ background: 'var(--background)', padding: '4px 8px' }}>5</div>
  </Flex>
)
```

## Theme
---

The default styles of `<Flex>` come from the theme and are configured with environment variables:

| Variable                  | Description                                       |
|---------------------------|---------------------------------------------------|
| `RD_THEME_FLEX`           | CSS of the component that is added to the page    |
| `RD_THEME_FLEX__ROOT`     | Class name(s) of the root element, always applied |

### Replacing the component

Set `RD_UI_FLEX` to a module alias, and `<Flex>` will be taken from the `Flex` export of that module:

```tsx
//! .env
RD_UI_FLEX='@theme/flex'
//! theme/flex.tsx
import { FlexComponent, FlexProps } from 'rundom'

export function Flex (props: FlexProps) {
  return <FlexComponent {...props} data-testid='flex' />
}
```

## What's Next?
---

- Learn about [\<Divider>](/ui/divider) for visual separation
- Explore the [\<Layout>](/ui/layout) component for page structure
- Learn about [\<Space>](/ui/space) for spacing
- Discover available [\<Icons>](/ui/icons) for visual elements
