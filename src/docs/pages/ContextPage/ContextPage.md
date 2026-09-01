# Context

You can pass a value from a parent element through any children to the place you need.

```tsx
//! src/Content.tsx
import { Context } from 'rundom'

export const color = new Context('blue')

export function Content () {
  return (
    <h1 style={{ color: color.get() }}>
      {children}
    </h1>
  )
}
```

## Provider

| Prop                | Type                           | Description                                                     |
|---------------------|--------------------------------|-----------------------------------------------------------------|
| **for** [*](#)      | `Context<T>` \| `Context<T>[]` | A context or array of contexts to provide                       |
| **set** [*](#)      | `T` \| `T[]`                   | A value or array of values to pass to the context(s)            |
| **children** [*](#) | `JSX.Element`                  | Child elements that will have access to the provided context(s) |

Use `Context.Provider` to provide context value into children.

```tsx
//! src/index.tsx
import { rundom } from 'rundom'
import { Context } from 'rundom'
import { Content, color } from './Content'

rundom(
  <>
    <Content>
      Without context
    </Content>
    <Context.Provider for={color} set='red'>
      <Content>
        With context
      </Content>
    </Context.Provider>
  </>
)
```
