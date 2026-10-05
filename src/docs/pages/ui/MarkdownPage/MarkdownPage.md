# Markdown

The `<Markdown>` component parses Markdown text and renders it into reactive DOM elements using `@textlint/markdown-to-ast`.

| Prop     | Type                     | Description                                                             |
|----------|--------------------------|-------------------------------------------------------------------------|
| **text** | `ObservableProp<string>` | Markdown text to parse and render. Can be a string or observable string |
| **map**  | `MarkdownMap`            | Custom rendering map for AST nodes                                      |

Use the `Markdown` component to render static Markdown strings or dynamic, reactive Markdown sources.

## text
---

Pass a Markdown string to `text` to render it:

```tsx
//! View
//> text
//! Code
import { rundom, Markdown } from 'rundom'

const text = '### Hello World\n\nThis is **markdown** content.'

rundom(
  <Markdown text={text} />
)
```

### Typography

Wrap `<Markdown>` in `<Typography>` to apply typographic styles to the rendered content:

```tsx
//! View
//> typography
//! Code
import { rundom, Markdown, Typography } from 'rundom'

rundom(
  <Typography>
    <Markdown 
      text='This is **markdown** content inside `<Typography>`.'
    />
  </Typography>
)
```

### Reactive text

You can pass a Slot or any other observable. The content is re-rendered whenever the value changes:

```tsx
//! View
//> reactiveText
//! Code
import { rundom, Markdown, Flex, Button, Typography } from 'rundom'
import { Slot } from 'rune-hub'

const text = new Slot(() => 'Some text.')

const update = () => {
  text.set(`New reactive content! **${Math.random()}**`)
}

rundom(
  <Flex vertical gap={8}>
    <Typography>
      <Markdown text={text} />
    </Typography>
    <Button onclick={update}>Update</Button>
  </Flex>
)
```

## map
---

Use `map` to override or extend how Markdown AST nodes are rendered. Keys are node type names from `@textlint/markdown-to-ast` (for example `Header`, `Paragraph`, `Emphasis`, `Link`). Nodes without an entry in `map` are rendered by default. Each renderer receives the node and the `render` function, so always render `children` through `render(child, render)`, otherwise nested content will be lost:

```tsx
//! View
//> customMap
//! Code
import { rundom, Markdown } from 'rundom'
import type { MarkdownMap } from 'rundom'

const map: MarkdownMap = {
  Emphasis: ({ children }, render) => (
    <span style={{ color: 'red' }}>
      {children?.map(child => render(child, render))}
    </span>
  ),
}

rundom(
  <Markdown
    text="Hello *world*!"
    map={map}
  />
)
```

## What's next?

- [\<Typography>](/ui/typography) — styles for text content, including rendered Markdown
- [\<Flex>](/ui/flex) — layout for arranging components
- [\<Button>](/ui/button) — handling user actions such as updating reactive text
