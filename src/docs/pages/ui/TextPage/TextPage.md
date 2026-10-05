# Text

The `<Text>` component is a basic typography element.
It supports font size, weight, color, decoration, alignment, wrapping, word breaking, and fine-grained reactivity.

| Prop           | Type                                | Description                                                                                                                       |
|----------------|-------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| **align**      | `ObservableProp<TextAlign>`         | Sets the [text alignment](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align#values)                                     |
| **break**      | `ObservableProp<TextBreak>`         | Controls how long words break across lines using [word-break](https://developer.mozilla.org/en-US/docs/Web/CSS/word-break#values) |
| **children**   | `JSX.Element`                       | Text content to render                                                                                                            |
| **color**      | `ObservableProp<string>`            | Sets the text color using any CSS color value                                                                                     |
| **cursor**     | `ObservableProp<string>`            | Sets the CSS cursor style for the text                                                                                            |
| **decoration** | `ObservableProp<TextDecoration>`    | Sets the [text decoration](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-line#values) style                    |
| **italic**     | `ObservableProp<boolean>`           | Applies `font-style: italic` when `true`                                                                                          |
| **nowrap**     | `ObservableProp<boolean \| number>` | Clamps the text to a single line (`true`) or to a specified number of lines                                                       |
| **size**       | `ObservableProp<number \| string>`  | Sets the font size. Pass a number for pixels or a string for any CSS unit                                                         |
| **weight**     | `ObservableProp<TextWeight>`        | Sets the [font weight](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#common_weight_name_keywords)                  |
| **wrap**       | `ObservableProp<TextWrap>`          | Controls the [text wrapping](https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap#values) behavior                          |

In addition to the props listed above, `<Text>` accepts all standard `<span>` element attributes such as `class`, `style`, `id`, `title`, and event handlers.

## size
---

The `size` prop sets the font size.
Pass a number for pixels or a string for any CSS unit:

```tsx
//! View
//> size
//! Code
import { rundom, Text, Flex } from 'rundom'

rundom(
  <Flex gap={8} align='center' wrap>
    <Text size={10}>Size 10</Text>
    <Text size={14}>Size 14</Text>
    <Text size={16}>Size 16</Text>
    <Text size={20}>Size 20</Text>
    <Text size={24}>Size 24</Text>
    <Text size='1.5em'>Size 1.5em</Text>
  </Flex>
)
```

## weight
---

The `weight` prop sets the font weight:

```tsx
//! View
//> weight
//! Code
import { rundom, Text, Flex } from 'rundom'

rundom(
  <Flex gap={8} align='center' wrap>
    <Text weight='normal'>Normal weight</Text>
    <Text weight='lighter'>Lighter weight</Text>
    <Text weight='bold'>Bold weight</Text>
    <Text weight='bolder'>Bolder weight</Text>
    <Text weight='100'>100</Text>
    <Text weight='200'>200</Text>
    <Text weight='300'>300</Text>
    <Text weight='400'>400</Text>
    <Text weight='500'>500</Text>
    <Text weight='600'>600</Text>
    <Text weight='700'>700</Text>
    <Text weight='800'>800</Text>
    <Text weight='900'>900</Text>
  </Flex>
)
```

## color
---

The `color` prop sets the text color using any CSS color value:

```tsx
//! View
//> color
//! Code
import { rundom, Text, Flex } from 'rundom'

rundom(
  <Flex gap={8} wrap>
    <Text color='#f06'>Red</Text>
    <Text color='#06f'>Blue</Text>
    <Text color='green'>Green</Text>
  </Flex>
)
```

## italic
---

The `italic` prop applies `font-style: italic` when set to `true`:

```tsx
//! View
//> italic
//! Code
import { rundom, Text, Flex } from 'rundom'

rundom(
  <Flex gap={8} wrap>
    <Text>Normal text</Text>
    <Text italic>Italic text</Text>
  </Flex>
)
```

## align
---

The `align` prop sets the text alignment using [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align#values):

```tsx
//! View
//> align
//! Code
import { rundom, Text, Flex } from 'rundom'

rundom(
  <Flex gap={8} align='stretch' vertical>
    <Text align='left'>Left aligned</Text>
    <Text align='center'>Center aligned</Text>
    <Text align='right'>Right aligned</Text>
    <Text align='justify' style={{ width: '120px' }}>
      Justify aligned text that wraps to show the effect
    </Text>
  </Flex>
)
```

## decoration
---

The `decoration` prop sets the text decoration using [`text-decoration-line`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-line#values):

```tsx
//! View
//> decoration
//! Code
import { rundom, Text, Flex } from 'rundom'

rundom(
  <Flex gap={8} wrap>
    <Text decoration='auto'>Auto</Text>
    <Text decoration='underline'>Underlined</Text>
    <Text decoration='line-through'>Line through</Text>
    <Text decoration='overline'>Overlined</Text>
  </Flex>
)
```

## nowrap
---

The `nowrap` prop clamps the text to a single line or a specified number of lines using `-webkit-line-clamp`:

- When `true`, clamps to 1 line.
- When a number, clamps to that many lines.

```tsx
//! View
//> nowrap
//! Code
import { rundom, Text, Flex, HTMLStyleProp } from 'rundom'

const nowrapStyle: HTMLStyleProp = {
  width: '100px',
  border: '1px dashed #06f',
  padding: '2px 8px',
}

rundom(
  <Flex gap={8} wrap>
    <Text style={nowrapStyle}>
      This is a long text that wraps normally
    </Text>
    <Text nowrap={2} style={nowrapStyle}>
      This text is clamped to 2 lines showing the line-clamp effect
    </Text>
    <Text nowrap style={nowrapStyle}>
      This is a long text that does not wrap (nowrap)
    </Text>
  </Flex>
)
```

## wrap
---

The `wrap` prop controls the text wrapping behavior using [`text-wrap`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap#values):

```tsx
//! View
//> wrap
//! Code
import { rundom, Text, Flex, HTMLStyleProp } from 'rundom'

const nowrapStyle: HTMLStyleProp = {
  width: '100px',
  border: '1px dashed #06f',
  padding: '2px 8px',
}

rundom(
  <Flex gap={8} wrap>
    <Text wrap='nowrap' style={nowrapStyle}>
      No wrap for this text
    </Text>
    <Text wrap='wrap' style={nowrapStyle}>
      This is text that wraps with normalized lines
    </Text>
    <Text wrap='balance' style={nowrapStyle}>
      This is text that wraps with balanced lines
    </Text>
  </Flex>
)
```

## break
---

The `break` prop controls how long words break across lines using [`word-break`](https://developer.mozilla.org/en-US/docs/Web/CSS/word-break#values):

```tsx
//! View
//> break
//! Code
import { rundom, Text, Flex, HTMLStyleProp } from 'rundom'

const style: HTMLStyleProp = {
  width: '100px',
  border: '1px dashed #06f',
  padding: '2px 8px',
  overflow: 'hidden',
}

rundom(
  <Flex gap={8} wrap>
    <Text break='normal' style={style}>
      (normal)
      Longwordwithoutspace
    </Text>
    <Text break='break-all' style={style}>
      (break-all)
      Longwordwithoutspace
    </Text>
    <Text break='keep-all' style={style}>
      (keep-all)
      Longwordwithoutspace
    </Text>
    <Text break='break-word' style={style}>
      (break-word)
      Longwordwithoutspace
    </Text>
  </Flex>
)
```

## cursor
---

The `cursor` prop sets the CSS cursor style for the text:

```tsx
//! View
//> cursor
//! Code
import { rundom, Text, Flex } from 'rundom'

rundom(
  <Flex gap={8} wrap>
    <Text cursor='pointer'>Pointer cursor</Text>
    <Text cursor='wait'>Wait cursor</Text>
    <Text cursor='text'>Text cursor</Text>
    <Text cursor='move'>Move cursor</Text>
  </Flex>
)
```

## Theme
---

The default styles of `<Text>` come from the theme and are configured with environment variables:

| Variable              | Description                                       |
|-----------------------|---------------------------------------------------|
| `RD_THEME_TEXT`       | CSS of the component that is added to the page    |
| `RD_THEME_TEXT__ROOT` | Class name(s) of the text element, always applied |

### Replacing the component

Set `RD_UI_TEXT` to a module alias, and `<Text>` will be taken from the `Text` export of that module:

```tsx
//! .env
RD_UI_TEXT='@theme/text'
//! theme/text.tsx
import { TextComponent, TextProps } from 'rundom'

export function Text (props: TextProps) {
  return <TextComponent {...props} data-testid="text" />
}
```

## What's Next?
---

- Explore the [\<Flex>](/ui/flex) component for layout arrangements
- Learn about [\<Button>](/ui/button) for interactive elements
- Discover available [\<Icons>](/ui/icons) for visual elements
- Review [State Management](/state-management) for fine-grained reactivity
