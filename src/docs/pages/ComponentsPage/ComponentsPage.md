# Components

Components are the fundamental building blocks of an `rundom` application.
A component is simply a function that returns renderable content, which you can then use directly as a JSX element.

```tsx
//! src/Content.tsx
export const Content = () => (
  <h1>
    Hello World!
  </h1>
)
```

You can render this component just like any built-in HTML element:

```tsx
//! src/index.tsx
import { rundom } from 'rundom'
import { Content } from './Content'

rundom(<Content />)
```

## Props
---

Every component receives a single argument: an object containing its `props`.
You can use standard TypeScript interfaces to type your component's properties.

```tsx
//! src/Content.tsx
interface ContentProps {
  color: string
}

export function Content ({ color }: ContentProps) {
  return (
    <p style={{ color }}>
      Hello World!
    </p>
  )
}
```

When using the component, you pass the required props as JSX attributes:

```tsx
//! src/index.tsx
import { rundom } from 'rundom'
import { Content } from './Content'

rundom(<Content color='red' />)
```

### State Props

In `rundom`, **components do not "re-render"**.

Instead, think of a component as the slider on a zipper: on one side is your reactive state, and on the other side are the DOM elements.
The component's only job is to connect (zip) them together.
A component is either inserted into the DOM (mounted) or removed from it (unmounted) — the component function itself is never called again.

Use the `StateProp<T>` type to allow a prop to receive either:

- A **plain value** (e.g., `'red'`).
- A **reactive getter function** (e.g., `() => state.value`).
- A **reactive `Observable` object** (like `Slot` from `rune-hub`).

When you pass a reactive object into a DOM attribute (like `style`), `rundom` establishes a direct, fine-grained binding.
When the state changes, `rundom` surgically updates only the specific DOM property, completely bypassing the component function.

```tsx
//! src/Content.tsx
interface ContentProps {
  color: StateProp<string>
  onClick: () => void
}

export function Content ({ color, onClick }: ContentProps) {
  return (
    <button onclick={onClick} style={{ color }}>
      Hello World!
    </button>
  )
}
```

In the parent component, create a `Slot` instance and pass it directly as a prop:

```tsx
//! src/index.tsx
import { rundom } from 'rundom'
import { Slot } from 'rune-hub'
import { Content } from './Content'

const color = new Slot(() => 'red')
const handleClick = () => color.set('blue')

rundom(
  <Content
    onClick={handleClick}
    color={color}
  />
)
```

Now, clicking the button updates the `color` to `'blue'`. The `Content` function is **not** executed again.
Instead, `rundom` detects the state change and directly updates the button's `style` property in the real DOM.

## Children
---

Use the `children` prop to render content passed between the opening and closing tags of your component.
`rundom` provides a built-in `ChildrenProps` type for convenience.

```tsx
//! src/Content.tsx
import { ChildrenProps } from 'rundom'

export function Content ({ children }: ChildrenProps) {
  return <h1>{children}!</h1>
}
```

You can pass nested JSX or text directly inside the component tags:

```tsx
//! src/index.tsx
import { rundom } from 'rundom'
import { Content } from './Content'

rundom(<Content color='red'>Hello</Content>)
```

## Return Type
---

`rundom` handles different return types gracefully to set up the initial DOM structure and reactive bindings:

- `string` and `number` are rendered as static text nodes.
  ```tsx
  //! Primitives
  const TextNum = () => 123
  const TextStr = () => '123'
  ```
- `null`, `undefined`, `boolean`, and `symbol` render nothing.
  ```tsx
  //! Ignored Values
  const Empty1 = () => null
  const Empty2 = () => {} // undefined
  const Empty3 = () => true
  const Empty4 = () => Symbol()
  ```
- Raw DOM elements (e.g., created via `document.createElement`) are inserted directly into the DOM.
  ```tsx
  //! DOM Elements
  const RawDiv = () => document.createElement('div')
  ```
- Standard JSX elements, Fragments, or arrays of elements are rendered into the DOM.
  ```tsx
  //! JSX Elements & Fragments
  const FragmentComp = () => <>content</>
  const ArrayComp = () => ['content']
  const JsxComp = () => <div>content</div>
  const BrComp = () => <br />
  ```

```tsx
//! Functions & Observables
const state = new Slot(() => {})

const Test1 = () => () => state.value
const Test2 = () => state
const Test3 = () => <div>{() => state.value}</div>
const Test4 = () => <div>{state}</div>
```

## Lifecycle
---

Simple, predictable lifecycle hooks. Components render once — effects run inline.

```tsx
//! Counter.tsx
import { useEffect } from 'rundom'
import { Slot } from 'rune-hub'

export function Counter () {
  const count = new Slot(() => 0)

  useEffect(() => {
    const timer = setInterval(() => {
      count.value++
    }, 1000)

    return () => clearInterval(timer)
  })

  return count
}
```

## What's Next?
---

- **[Components](/components)** — Learn about component patterns, props, children, and lifecycle hooks like `useEffect`.
- **[State Management](/state-management)** — Deep dive into reactive state with `rune-hub`, including `Slot` and watchers.
