# Code

The `<Code>` component renders inline code text using the `<code>` element.

| Prop           | Type                      | Description                                                                 |
|----------------|---------------------------|-----------------------------------------------------------------------------|
| **children**   | `JSX.Element`             | Code content to render                                                      |
| **class**      | `string`                  | Additional CSS class(es) to apply to the root element                       |
| **style**      | `HTMLStyleProp`           | Inline styles to apply to the root element                                  |

In addition to the props listed above, `<Code>` accepts all standard `<code>` element attributes such as `id`, `title`, and event handlers.

## Basic usage
---

Use `<Code>` to render inline code fragments:

```tsx
//! View
//> basic
//! Code
import { rundom, Code, Flex } from 'rundom'

rundom(
  <Flex gap={8} wrap>
    <Code>const x = 1</Code>
    <Code>let y = 2</Code>
  </Flex>
)
```

## Content
---

Any text or JSX can be passed as children:

```tsx
//! View
//> content
//! Code
import { rundom, Code, Flex } from 'rundom'

rundom(
  <Flex gap={8} wrap>
    <Code>{'<div>Hello</div>'}</Code>
    <Code>{'const fn = () => {}'}</Code>
  </Flex>
)
```

## Theme
---

The default styles of `<Code>` come from the theme and are configured with environment variables:

| Variable               | Description                                       |
|------------------------|---------------------------------------------------|
| `RD_THEME_CODE`        | CSS of the component that is added to the page    |
| `RD_THEME_CODE__ROOT`  | Class name(s) of the root element, always applied |

### Replacing the component

Set `RD_UI_CODE` to a module alias, and `<Code>` will be taken from the `Code` export of that module:

```tsx
//! .env
RD_UI_CODE='@theme/code'
//! theme/code.tsx
import { CodeComponent, CodeProps } from 'rundom'

export function Code (props: CodeProps) {
  return <CodeComponent {...props} data-testid='code' />
}
```

## What's Next?
---

- Learn about [\<Divider>](/ui/divider) for visual separation
- Explore the [\<Link>](/ui/link) for hyperlinks
- Discover available [\<Icons>](/ui/icons) for visual elements
