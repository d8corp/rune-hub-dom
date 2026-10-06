# Flex

The `<Flex>` component is a layout primitive that renders a flex container.
It supports alignment, justification, gap, wrapping, direction, padding, and more.

| Prop                       | Type                                             | Description                                                                                                      |
|----------------------------|--------------------------------------------------|------------------------------------------------------------------------------------------------------------------|
| [**align**](#align)        | `ObservableProp<FlexAlign \| undefined>`         | Sets cross-axis alignment via [align-items](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items)        |
| **class**                  | `string` `FlexStyles`                            | Additional CSS class(es) to apply to the root element                                                            |
| [**element**](#element)    | `FlexElement`                                    | HTML tag to render as the root element (default: `'div'`)                                                        |
| [**flex**](#flex-property) | `ObservableProp<number \| boolean \| undefined>` | Sets `flex` on the container. `true` becomes `1`                                                                 |
| [**gap**](#gap)            | `ObservableProp<FlexGap \| undefined>`           | Sets `gap`. A number means a single value, an array is `row` and `column`                                        |
| [**inline**](#inline)      | `ObservableProp<boolean \| undefined>`           | Uses `display: inline-flex` when `true`                                                                          |
| [**justify**](#justify)    | `ObservableProp<FlexJustify \| undefined>`       | Sets main-axis alignment via [justify-content](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content) |
| [**padding**](#padding)    | `ObservableProp<FlexPadding \| undefined>`       | Sets `padding` in pixels                                                                                         |
| [**reverse**](#reverse)    | `ObservableProp<boolean \| undefined>`           | Reverses the flex direction                                                                                      |
| **style**                  | `HTMLStyleProp`                                  | Inline styles to apply to the root element                                                                       |
| [**vertical**](#vertical)  | `ObservableProp<boolean \| undefined>`           | Sets `flex-direction: column` when `true`                                                                        |
| [**wrap**](#wrap)          | `ObservableProp<boolean \| undefined>`           | Enables `flex-wrap: wrap`                                                                                        |

In addition to the props listed above, `<Flex>` accepts all standard `<div>` element attributes such as `class`, `style`, `id`, `title`, and event handlers.

## Element
---

By default `<Flex>` renders a `<div>`. The `element` prop lets you pick any tag from `HTMLElementTagNameMap`, which is handy when the layout should also carry a semantic meaning such as `<nav>`, `<header>`, `<ul>` or `<li>`:

```tsx
//! View
//> element
//! Code
import { rundom, Flex } from 'rundom'

rundom(
  <Flex gap={8}>
    <Flex element='div'>div</Flex>
    <Flex element='a' href='#element'>a</Flex>
    <Flex element='button'>button</Flex>
  </Flex>
)
```

Since the root tag is chosen by `element`, `<Flex>` accepts the native attributes of that tag, for example `href` and `target` for `<a>`, or `disabled` and `type` for `<button>`. When `element` is set to `'a'`, `<Flex>` renders a [`<Link>`](/ui/link) and additionally accepts its link props such as `exact`.

## Align
---

The `align` prop controls cross-axis alignment via [align-items](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items).
The example below applies a few values to the same set of children:

```tsx
//! View
//> align
//! Code
import { rundom, Flex } from 'rundom'

const child = { border: '1px dashed #7C3AED', padding: '4px 8px' }

rundom(
  <Flex gap={8} padding={4} wrap style={{ height: '64px' }}>
    {(['start', 'center', 'end', 'stretch'] as const).map(align => (
      <Flex align={align} padding={4} style={{ border: '1px dashed #999' }}>
        <div style={child}>{align}</div>
      </Flex>
    ))}
  </Flex>
)
```

## Justify
---

The `justify` prop controls main-axis alignment via [justify-content](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content).
The example below distributes a few values across the main axis:

```tsx
//! View
//> justify
//! Code
import { rundom, Flex } from 'rundom'

const child = { border: '1px dashed #7C3AED', padding: '4px 8px' }

rundom(
  <Flex wrap gap={16}>
    {(['start', 'end', 'center', 'space-between', 'space-around'] as const).map(align => (
      <Flex flex justify={align} padding={4} gap={4} style={{ border: '1px dashed #999', 'min-width': '200px' }}>
        <div style={child}>justify</div>
        <div style={child}>{align}</div>
      </Flex>
    ))}
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

const child = { border: '1px dashed #7C3AED', padding: '4px 8px' }

rundom(
  <Flex wrap padding={4} gap={[16, 32]} style={{ border: '1px dashed #999', width: '100px' }}>
    <div style={child}>1</div>
    <div style={child}>2</div>
    <div style={child}>3</div>
  </Flex>
)
```

## Inline
---

Set `inline` to render the container as `display: inline-flex` instead of `display: flex`.
This keeps the container in the text flow, so it sits on the same line as the surrounding content:

```tsx
//! View
//> inline
//! Code
import { rundom, Flex } from 'rundom'

const child = { border: '1px dashed #7C3AED', padding: '4px 8px' }

rundom(
  <div>
    Text before
    <Flex inline style={{ ...child, margin: '0 4px' }}>inline</Flex>
    text between
    <Flex inline style={{ ...child, margin: '0 4px' }}>flex</Flex>
    text after
  </div>
)
```

## Padding
---

The `padding` prop sets the container padding in pixels.
It accepts a single number or an array with 1–4 values (like CSS shorthand).
The example below shows a single value and arrays of 2, 3 and 4 values:

```tsx
//! View
//> padding
//! Code
import { rundom, Flex } from 'rundom'

const parent = { border: '1px dashed #999' }
const child = { border: '1px dashed #7C3AED', padding: '4px 8px' }

rundom(
  <Flex wrap gap={8} align='center'>
    <Flex padding={16} style={parent}>
      <div style={child}>16</div>
    </Flex>
    <Flex padding={[16, 32]} style={parent}>
      <div style={child}>[16, 32]</div>
    </Flex>
    <Flex padding={[8, 16, 32]} style={parent}>
      <div style={child}>[8, 16, 32]</div>
    </Flex>
    <Flex padding={[0, 8, 16, 32]} style={parent}>
      <div style={child}>[0, 8, 16, 32]</div>
    </Flex>
  </Flex>
)
```

## Reverse
---

The `reverse` prop reverses the flex direction.
The children are declared as 1, 2, 3 but are rendered in reverse order:

```tsx
//! View
//> reverse
//! Code
import { rundom, Flex } from 'rundom'

const parent = { border: '1px dashed #999' }
const child = { border: '1px dashed #7C3AED', padding: '4px 8px' }

rundom(
  <Flex reverse gap={8} padding={4} style={parent}>
    <div style={child}>1</div>
    <div style={child}>2</div>
    <div style={child}>3</div>
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

const parent = { border: '1px dashed #999' }
const child = { border: '1px dashed #7C3AED', padding: '4px 8px' }

rundom(
  <Flex vertical gap={8} style={parent} padding={4}>
    <div style={child}>1</div>
    <div style={child}>2</div>
    <div style={child}>3</div>
  </Flex>
)
```

## Wrap
---

The `wrap` prop enables multi-line flex layout using `flex-wrap: wrap`.
Children that don't fit in a single line move to the next one:

```tsx
//! View
//> wrap
//! Code
import { rundom, Flex } from 'rundom'

const parent = { border: '1px dashed #999' }
const child = { border: '1px dashed #7C3AED', padding: '4px 8px' }

rundom(
  <Flex wrap gap={8} padding={4} style={{ ...parent, width: '160px' }}>
    <div style={child}>1</div>
    <div style={child}>2</div>
    <div style={child}>3</div>
    <div style={child}>4</div>
    <div style={child}>5</div>
    <div style={child}>6</div>
  </Flex>
)
```

## Flex property
---

Set `flex` or `flex={n}` on a child `<Flex>` to make it expand and fill the available space, while the other child keeps its size:

```tsx
//! View
//> flex
//! Code
import { rundom, Flex } from 'rundom'

const parent = { border: '1px dashed #999' }
const child = { border: '1px dashed #7C3AED', padding: '4px 8px' }

rundom(
  <Flex wrap gap={8} padding={4} style={parent}>
    <Flex flex justify='center' style={child}>
      flex
    </Flex>
    <Flex flex={2} justify='center' style={child}>
      flex: 2
    </Flex>
    <Flex align='center' justify='center' style={child}>fixed</Flex>
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
