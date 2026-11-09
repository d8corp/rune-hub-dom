# Eyebrow

The `<Eyebrow>` component renders a small uppercase label above a heading or section.
It supports color and size variants and accepts reactive props.

| Prop         | Type                           | Description                                                                        |
|--------------|--------------------------------|------------------------------------------------------------------------------------|
| **children** | `JSX.Element`                  | Label content to render                                                            |
| **class**    | `string` `TextStyles`         | Additional CSS class(es) to apply to the root element                              |
| **color**    | `ObservableProp<TextColor>`    | Sets the label color. Available values: `primary` (default), `accent`, `secondary`, `success`, `warning`, `danger`, `disabled`, `text`, `muted`, `dim` |
| **size**     | `ObservableProp<TextSize>`     | Sets the font size. Available values: `xxs`, `xs` (default), `s`, `m`, `l`, `xl`, `xxl`. Exact sizes depend on the theme |
| **style**    | `HTMLStyleProp`                | Inline styles to apply to the root element                                         |

`<Eyebrow>` inherits all props of [\<Text>](/ui/text), including `weight`, `align`, `nowrap`, and `decoration`.

In addition to the props listed above, `<Eyebrow>` accepts all standard `<span>` element attributes such as `id`, `title`, and event handlers.

## Basic usage
---

Use `<Eyebrow>` as a short label above a heading:

```tsx
//! View
//> basic
//! Code
import { rundom, Eyebrow, Flex, Text } from 'rundom'

rundom(
  <Flex vertical gap={6}>
    <Eyebrow>Release notes</Eyebrow>
    <Text size={24} weight='700'>Rundom UI 2.0</Text>
  </Flex>
)
```

## Color
---

The `color` prop changes the label color. The default is `primary`:

```tsx
//! View
//> color
//! Code
import { rundom, Eyebrow, Flex } from 'rundom'

rundom(
  <Flex gap={12} wrap>
    <Eyebrow color='primary'>Primary</Eyebrow>
    <Eyebrow color='text'>Text</Eyebrow>
    <Eyebrow color='muted'>Muted</Eyebrow>
    <Eyebrow color='dim'>Dim</Eyebrow>
    <Eyebrow color='accent'>Accent</Eyebrow>
    <Eyebrow color='success'>Success</Eyebrow>
    <Eyebrow color='warning'>Warning</Eyebrow>
    <Eyebrow color='danger'>Danger</Eyebrow>
    <Eyebrow color='disabled'>Disabled</Eyebrow>
  </Flex>
)
```

## Size
---

The `size` prop controls the font size using the same seven named values as `<Text>`:

```tsx
//! View
//> size
//! Code
import { rundom, Eyebrow, Flex } from 'rundom'

rundom(
  <Flex gap={12} align='center' wrap>
    <Eyebrow size='xxs'>xxs</Eyebrow>
    <Eyebrow size='xs'>xs</Eyebrow>
    <Eyebrow size='s'>s</Eyebrow>
    <Eyebrow size='m'>m</Eyebrow>
    <Eyebrow size='l'>l</Eyebrow>
    <Eyebrow size='xl'>xl</Eyebrow>
    <Eyebrow size='xxl'>xxl</Eyebrow>
  </Flex>
)
```

## Theme
---

The default styles of `<Eyebrow>` come from the theme and are configured with environment variables:

| Variable                   | Description                                       |
|----------------------------|---------------------------------------------------|
| `RD_THEME_EYEBROW`         | CSS of the component that is added to the page    |
| `RD_THEME_EYEBROW__ROOT`   | Class name(s) of the root element, always applied |

Color and size classes are inherited from `<Text>` and configured with `RD_THEME_TEXT__*` variables.

### Replacing the component

Set `RD_UI_EYEBROW` to a module alias, and `<Eyebrow>` will be taken from the `Eyebrow` export of that module:

```tsx
//! .env
RD_UI_EYEBROW='@theme/eyebrow'
//! theme/eyebrow.tsx
import { EyebrowComponent, EyebrowProps } from 'rundom'

export function Eyebrow (props: EyebrowProps) {
  return <EyebrowComponent {...props} data-testid='eyebrow' />
}
```

## What's Next?
---

- Explore the [\<Typography>](/ui/typography) container for rich text content
- Learn about [\<Text>](/ui/text) for inline text styles
- Render rich content with [\<Markdown>](/ui/markdown)
