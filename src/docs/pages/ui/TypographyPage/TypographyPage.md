# Typography

The `<Typography>` component is a container element that applies standard typographic styling (such as headings, paragraphs, lists, links, and blockquotes) to its children.

It renders an `<article>` HTML tag by default.

| Prop         | Type                                                  | Description                                       |
|--------------|-------------------------------------------------------|---------------------------------------------------|
| **children** | `JSX.Element`                                         | Content to render inside the typography container |
| **class**    | `ObservableProp<string \| Partial<TypographyStyles>>` | CSS class name(s) or style override object        |
| **flex**     | `ObservableProp<number \| boolean>`                   | Flex layout behavior (default: `undefined`)       |

In addition to the props listed above, `<Typography>` accepts all standard `<article>` element attributes such as `class`, `style`, `id`, `title`, and event handlers.

## Usage
---

Wrap HTML content inside `<Typography>` to apply typography styles:

```tsx
//! View
//> basic
//! Code
import { rundom, Typography } from 'rundom'

rundom(
  <Typography>
    <h3>Typography Heading</h3>
    <p>This paragraph is styled by the Typography container, including standard typography rules for text, lists, and quotes.</p>
    <blockquote>A styled blockquote inside the typography wrapper.</blockquote>
  </Typography>
)
```

## Markdown
---

`<Typography>` is often combined with `<Markdown>` to format rendered markdown content:

```tsx
//! View
//> markdown
//! Code
import { rundom, Typography, Markdown } from 'rundom'

const content = `This is a paragraph with some text.

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

### Horizontal Rules
___

---

***

### Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~

### Blockquotes

> Level 1
>> Level 2
>>> Level 3


### Lists

Unordered

+ Create a list by starting a line with \`+\`, \`-\`, or \`*\`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa


1. You can use sequential numbers...
1. ...or keep all the numbers as \`1.\`

Start numbering with offset:

57. foo
1. bar


### Code

Inline \`code\`

Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code


Block code "fences"

\`\`\`
Sample text here...
\`\`\`

Syntax highlighting

\`\`\` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
\`\`\`

### Tables

| Option | Description                                                               |
|--------|---------------------------------------------------------------------------|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default.    |
| ext    | extension to be used for dest files.                                      |

Right aligned columns

| Option |                                                               Description |
|-------:|--------------------------------------------------------------------------:|
|   data | path to data files to supply the data that will be passed into templates. |
| engine |    engine to be used for processing templates. Handlebars is the default. |
|    ext |                                      extension to be used for dest files. |`

rundom(
  <Typography>
    <Markdown text={content} />
  </Typography>
)
```

## flex
---

Use `flex` to control flex layout behavior when `<Typography>` is placed inside a flex container:

```tsx
//! View
//> flex
//! Code
import { rundom, Typography, Flex } from 'rundom'

rundom(
  <Flex gap={16}>
    <Typography flex style={{ border: '1px dashed #06f', padding: '12px' }}>
      <h3>Left Column</h3>
      <p>Flexible block with <code>flex</code> set to <code>true</code> (expands to fill available space).</p>
    </Typography>
    <Typography style={{ width: '160px', border: '1px dashed #999', padding: '12px' }}>
      <h3>Right Column</h3>
      <p>Fixed width block (160px).</p>
    </Typography>
  </Flex>
)
```

## class
---

Customize the styling with a regular CSS class name, or pass an object to override styles:

```tsx
//! src/index.tsx
import { rundom, Typography } from 'rundom'

const customStyles = {
  root: 'my-typography',
}

rundom(
  <Typography class={customStyles}>
    <p>Custom styled typography block.</p>
  </Typography>
)
```

## Theme
---

The default styles of `<Typography>` come from the theme and are configured with environment variables:

| Variable                    | Description                                    |
|-----------------------------|------------------------------------------------|
| `RD_THEME_TYPOGRAPHY`       | CSS of the component that is added to the page |
| `RD_THEME_TYPOGRAPHY__ROOT` | Class name(s) of the container, always applied |

### Replacing the component

Set `RD_UI_TYPOGRAPHY` to a module alias, and `<Typography>` will be taken from the `Typography` export of that module:

```tsx
//! .env
RD_UI_TYPOGRAPHY='@theme/typography'
//! theme/typography.tsx
import { TypographyComponent, TypographyProps } from 'rundom'

export function Typography (props: TypographyProps) {
  return <TypographyComponent {...props} data-testid="typography" />
}
```

## What's Next?
---

- Explore [\<Text>](/ui/text) for inline and block text styling
- Learn about [\<Markdown>](/ui/markdown) for parsing and rendering Markdown AST
- Check [\<Flex>](/ui/flex) for layout positioning
