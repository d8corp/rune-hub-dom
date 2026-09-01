# Context

You can pass a value from a parent element through any children to the place you need.

Context solves the problem of "prop drilling" — when you need to pass data through multiple layers of components. Instead of threading props through every intermediate component, Context lets you broadcast values to any descendant that needs them.

## Provider

Use `<Context.Provider>` to provide context value into children.

| Prop                | Type                           | Description                                                     |
|---------------------|--------------------------------|-----------------------------------------------------------------|
| **for** [*](#)      | `Context<T>` \| `Context<T>[]` | A context or array of contexts to provide                       |
| **set** [*](#)      | `T` \| `T[]`                   | A value or array of values to pass to the context(s)            |
| **children** [*](#) | `JSX.Element`                  | Child elements that will have access to the provided context(s) |

## Basic Usage
---

Create a context with a default value, then use `<Context.Provider>` to override it for specific component trees.

```tsx
//! src/App.tsx
import { Context } from 'rundom'

const color = new Context('blue')

function Title () {
  return (
    <h1 style={{ color: color.get() }}>
      Hello World
    </h1>
  )
}

export function App () {
  return (
    <>
      <Title />
      <Context.Provider for={color} set='red'>
        <Title />
      </Context.Provider>
    </>
  )
}
```

The first `<Title />` displays in blue (the default), while the second displays in red (the provided value).

> #### Notice
> Do not use `color.get()` inside async functions or events. The method of `get()` works like a hook.

## Multiple Contexts
---

You can provide multiple contexts at once by passing arrays to the `for` and `set` props.

```tsx
//! src/App.tsx
import { Context } from 'rundom'

const textColor = new Context('black')
const bgColor = new Context('white')
const fontSize = new Context(16)

function Card () {
  return (
    <div style={{
      color: textColor.get(),
      backgroundColor: bgColor.get(),
      fontSize: `${fontSize.get()}px`,
      padding: '20px'
    }}>
      Styled Card
    </div>
  )
}

export function App () {
  return (
    <Context.Provider
      for={[textColor, bgColor, fontSize]}
      set={['white', '#1a1a1a', 18]}
    >
      <Card />
    </Context.Provider>
  )
}
```

## Reactive Context
---

By default, context values are not reactive.
Combine `Context` with `Slot` from [rune-hub](https://www.npmjs.com/package/rune-hub) to create reactive contexts that update all consumers when values change.

```tsx
//! src/App.tsx
import { Context } from 'rundom'
import { Slot } from 'rune-hub'

const counter = new Context<Slot<number>>()

function Counter () {
  const count = counter.get()!
  const inc = () => count.value++

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={inc}>
        Increment
      </button>
    </div>
  )
}

export function App () {
  const count = new Slot(() => 0)

  return (
    <div>
      Count: {count}
      <Context.Provider for={counter} set={count}>
        <Counter />
        <Counter />
      </Context.Provider>
    </div>
  )
}
```

Both `<Counter />` components share the same reactive state. Clicking either button updates both displays.
