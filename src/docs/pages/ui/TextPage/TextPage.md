# Text

The `<Text>` component is a basic typography element.
It supports font size, weight, color, decoration, alignment, wrapping, word breaking, and fine-grained reactivity.

| Prop           | Type                                | Description                                                                                                                       |
|----------------|-------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| **align**      | `ObservableProp<TextAlign>`         | Sets the [text alignment](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align#values)                                     |
| **box**        | `ObservableProp<TextBox>`           | Controls text box trimming and edge using [text-box](https://developer.mozilla.org/en-US/docs/Web/CSS/text-box)                   |
| **break**      | `ObservableProp<TextBreak>`         | Controls how long words break across lines using [word-break](https://developer.mozilla.org/en-US/docs/Web/CSS/word-break#values) |
| **children**   | `JSX.Element`                       | Text content to render                                                                                                            |
| **color**      | `ObservableProp<TextColor>`         | Sets the text color. Available values: `primary`, `accent`, `secondary`, `success`, `warning`, `danger`, `disabled`, `text`, `muted`, `dim` |
| **cursor**     | `ObservableProp<string>`            | Sets the CSS cursor style for the text                                                                                            |
| **decoration** | `ObservableProp<TextDecoration>`    | Sets the [text decoration](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-line#values) style                    |
| **italic**     | `ObservableProp<boolean>`           | Applies `font-style: italic` when `true`                                                                                          |
| **nowrap**     | `ObservableProp<boolean \| number>` | Clamps the text to a single line (`true`) or to a specified number of lines                                                       |
| **size**       | `ObservableProp<TextSize>`          | Sets the font size. Available values: `xxs`, `xs`, `s`, `m`, `l`, `xl`, `xxl`. Exact sizes depend on the theme |
| **weight**     | `ObservableProp<TextWeight>`        | Sets the [font weight](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#common_weight_name_keywords)                  |
| **wrap**       | `ObservableProp<TextWrap>`          | Controls the [text wrapping](https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap#values) behavior                          |

In addition to the props listed above, `<Text>` accepts all standard `<span>` element attributes such as `class`, `style`, `id`, `title`, and event handlers.

## size
---

The `size` prop sets the font size using one of seven named values: `xxs`, `xs`, `s`, `m`, `l`, `xl`, `xxl`.
Exact sizes depend on the theme.

For a custom size, pass it through `style`:

```tsx
<Text style={{ 'font-size': '1.5em' }}>Custom size</Text>
```

```tsx
//! View
//> size
//! Code
import { rundom, Text, Flex } from 'rundom'

rundom(
  <Flex gap={8} align='center' wrap>
    <Text size='xxs'>xxs</Text>
    <Text size='xs'>xs</Text>
    <Text size='s'>s</Text>
    <Text size='m'>m</Text>
    <Text size='l'>l</Text>
    <Text size='xl'>xl</Text>
    <Text size='xxl'>xxl</Text>
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

The `color` prop sets the text color using one of the theme color variants:

```tsx
//! View
//> color
//! Code
import { rundom, Text, Flex } from 'rundom'

rundom(
  <Flex gap={8} wrap>
    <Text color='primary'>Primary</Text>
    <Text color='accent'>Accent</Text>
    <Text color='secondary'>Secondary</Text>
    <Text color='success'>Success</Text>
    <Text color='warning'>Warning</Text>
    <Text color='danger'>Danger</Text>
    <Text color='disabled'>Disabled</Text>
    <Text color='text'>Text</Text>
    <Text color='muted'>Muted</Text>
    <Text color='dim'>Dim</Text>
  </Flex>
)
```

For a custom color, pass it through `style`:

```tsx
<Text style={{ color: '#f06' }}>Custom color</Text>
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

## box
---

The `box` prop controls text box trimming and edge using [`text-box`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-box):

```tsx
//! View
//> box
//! Code
import { rundom, Text, Flex } from 'rundom'

rundom(
  <Flex gap={8} vertical>
    <Text box='none' size='xxl' style={{ border: '1px dashed #06f' }}>
      none (default)
    </Text>
    <Text box='trim-start' size='xxl' style={{ border: '1px dashed #06f' }}>
      trim-start
    </Text>
    <Text box='trim-end' size='xxl' style={{ border: '1px dashed #06f' }}>
      trim-end
    </Text>
    <Text box='trim-both' size='xxl' style={{ border: '1px dashed #06f' }}>
      trim-both
    </Text>
    <Text box='cap alphabetic' size='xxl' style={{ border: '1px dashed #06f' }}>
      cap alphabetic
    </Text>
    <Text box='ex alphabetic' size='xxl' style={{ border: '1px dashed #06f' }}>
      ex alphabetic
    </Text>
  </Flex>
)
```

## Theme
---

The default styles of `<Text>` come from the theme and are configured with environment variables:

| Variable                     | Description                                          |
|------------------------------|------------------------------------------------------|
| `RD_THEME_TEXT`              | CSS of the component that is added to the page       |
| `RD_THEME_TEXT__ROOT`        | Class name(s) of the text element, always applied    |
| `RD_THEME_TEXT__PRIMARY`     | Class name(s) applied when `color` is `'primary'`    |
| `RD_THEME_TEXT__ACCENT`      | Class name(s) applied when `color` is `'accent'`     |
| `RD_THEME_TEXT__SECONDARY`   | Class name(s) applied when `color` is `'secondary'`  |
| `RD_THEME_TEXT__SUCCESS`     | Class name(s) applied when `color` is `'success'`    |
| `RD_THEME_TEXT__WARNING`     | Class name(s) applied when `color` is `'warning'`    |
| `RD_THEME_TEXT__DANGER`      | Class name(s) applied when `color` is `'danger'`     |
| `RD_THEME_TEXT__DISABLED`    | Class name(s) applied when `color` is `'disabled'`   |
| `RD_THEME_TEXT__TEXT`        | Class name(s) applied when `color` is `'text'`       |
| `RD_THEME_TEXT__MUTED`       | Class name(s) applied when `color` is `'muted'`      |
| `RD_THEME_TEXT__DIM`         | Class name(s) applied when `color` is `'dim'`        |
| `RD_THEME_TEXT__XXS`         | Class name(s) applied when `size` is `'xxs'`         |
| `RD_THEME_TEXT__XS`          | Class name(s) applied when `size` is `'xs'`          |
| `RD_THEME_TEXT__S`           | Class name(s) applied when `size` is `'s'`           |
| `RD_THEME_TEXT__M`           | Class name(s) applied when `size` is `'m'`           |
| `RD_THEME_TEXT__L`           | Class name(s) applied when `size` is `'l'`           |
| `RD_THEME_TEXT__XL`          | Class name(s) applied when `size` is `'xl'`          |
| `RD_THEME_TEXT__XXL`         | Class name(s) applied when `size` is `'xxl'`         |

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
