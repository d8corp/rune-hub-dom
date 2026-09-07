# JSX Elements

`JSXElement` is the core return type that components produce and that `rundom()` accepts as an argument.
Understanding what values are considered valid JSX elements is essential for building efficient, predictable applications.

JSX is a syntax extension for JavaScript that allows you to write HTML-like markup inside JavaScript files.
For a comprehensive introduction to JSX syntax and transformation, see the [JSX Documentation](https://www.typescriptlang.org/docs/handbook/jsx.html).

## Overview
---

In `rundom`, a `JSXElement` represents any value that can be rendered into the DOM.
The framework handles different types intelligently, converting them into DOM nodes, text content, or reactive bindings as needed.

```tsx
//! Valid JSX Elements
import { rundom } from 'rundom'

// All of these are valid JSXElement values
rundom(<div>Hello</div>)           // JSX DOM element
rundom(<App />)                     // JSX component
rundom(document.createElement('p')) // Raw HTMLElement
rundom('Hello World')               // string
rundom(42)                          // number
rundom(null)                        // null (renders nothing)
```

## JSX DOM Element
---

The most common `JSXElement` type is a standard JSX expression representing an HTML element.
These are transformed at compile time into calls that create real DOM nodes.

```tsx
//! JSX DOM Elements
rundom(
  <h1>Title</h1>
)
```

JSX DOM elements support all standard HTML attributes and event handlers:

```tsx
//! With Attributes
const StyledButton = () => (
  <button
    class="button"
    onclick={() => console.log('Click')}
    style={{ color: 'red' }}>
    Content
  </button>
)
```

For a detailed guide on JSX DOM Elements, their attributes, events, and styling, see **[JSX DOM Elements](/jsx-dom-elements)**.

## JSX Component
---

Components are functions that return `JSXElement` values.
When you use a component in JSX syntax, it creates a JSX component element.

```tsx
//! Component Usage
interface GreetingProps {
  name: string
}

function Greeting ({ name }: GreetingProps) {
  return <h1>Hello, {name}!</h1>
}

const App = () => <Greeting name="World" />
```

For a comprehensive guide on component patterns, props, children, and lifecycle, see **[Components](/components)**.

## HTMLElement
---

Raw DOM elements created via `document.createElement()` or obtained from the DOM API are valid `JSXElement` values.
`rundom` inserts them directly into the DOM without any transformation.

```tsx
//! Raw DOM Elements
const RawDiv = () => {
  const div = document.createElement('div')
  div.textContent = 'Created directly'
  return div
}
```

This is useful when integrating with third-party libraries:

```tsx
//! Third-Party Integration
import someLibrary from 'some-lib'

const Widget = () => (
  someLibrary.createWidget()
)
```

## String
---

String values are rendered as text nodes in the DOM.
HTML special characters are automatically escaped, preventing XSS attacks.

```tsx
//! String Elements
const Text = () => 'Hello World'

const SafeText = () => {
  const input = '<script>alert("XSS")</script>'
  return input // HTML is escaped
}
```

Strings can be embedded within JSX:

```tsx
//! Embedded Strings
const Paragraph = () => <p>{'This is a string'}</p>
// The same
const Paragraph1 = () => <p>This is a string</p>
```

## Number
---

Number values are converted to strings and rendered as text nodes.

```tsx
//! Number Elements
const Counter = () => 42
const Zero = () => 0
```

Number can be embedded within JSX:

```tsx
//! Embedded Numbers
interface ExampleProps {
  a: number
  b: number
}

function Example ({ a, b }: ExampleProps) {
  return (
    <div>
      {a} + {b} = {a + b}
    </div>
  )
}
```

## Null & Undefined
---

`null` and `undefined` values render nothing.
They are useful for conditional rendering when you want to omit content entirely.

```tsx
//! Null & Undefined
const Empty1 = () => null
const Empty2 = () => undefined
const Empty3 = () => {} // implicit undefined
```

Use them in conditional expressions:

```tsx
//! Conditional Rendering
interface ConditionalProps {
  value: boolean
}

function Conditional ({ value }: ConditionalProps) {
  if (!value) return null

  return <div>Passed</div>
}
```

## Boolean
---

Boolean values (`true`, `false`) render nothing, similar to `null` and `undefined`.

```tsx
//! Boolean Elements
const BoolTrue = () => true
const BoolFalse = () => false
```

Booleans are useful in logical expressions:

```tsx
//! Logical Expressions
import { Slot } from 'rune-hub'

const Conditional = () => {
  const show = new Slot(() => true)
  
  return (
    <div>
      {() => show.value && <p>Visible</p>}
    </div>
  )
}
```

## Symbol
---

Symbol values render nothing, similar to `null`, `undefined`, and booleans.

```tsx
//! Symbol Elements
const SymbolComp = () => Symbol()
const NamedSymbol = () => Symbol('ignored')
```

Symbols are rarely used as return values but are handled gracefully by `rundom`.

## Array
---

Arrays of `JSXElement` values are flattened and rendered sequentially.
Each element in the array is processed according to its type.

```tsx
//! Array Elements
const List = () => [
  <li>Item 1</li>,
  <li>Item 2</li>,
  <li>Item 3</li>,
]
```

Arrays can contain mixed types:

```tsx
//! Mixed Array
const Mixed = () => [
  'Text',
  42,
  <span>JSX</span>,
  null,
]
```

For efficient list rendering with automatic reconciliation, use the built-in **[\<For>](/for)** component.

## Fragment
---

Fragments let you group multiple elements without adding an extra DOM node.
Use the short syntax `<>...</>` or the explicit `<Fragment>...</Fragment>`.

```tsx
//! Fragment Syntax
const Header = () => (
  <>
    <h1>Title</h1>
    <p>Description</p>
  </>
)
```

## Function & Slot
---

Functions and `Slot` objects create **reactive bindings** — the core mechanism behind `rundom`'s fine-grained reactivity.

### Reactive Functions

When you return a function or pass a function as a child, `rundom` establishes a reactive dependency.
The function is automatically re-executed whenever the state it accesses changes.

```tsx
//! Reactive Functions
import { Slot } from 'rune-hub'

const ReactiveText = () => {
  const count = new Slot(() => 0)
  
  return () => `Count: ${count.value}`
}
```

You can use reactive functions within JSX:

```tsx
//! Inline Reactive Functions
import { Slot } from 'rune-hub'

const Counter = () => {
  const count = new Slot(() => 0)
  
  return (
    <div>
      <p>{() => count.value}</p>
      <button onclick={() => count.value++}>+</button>
    </div>
  )
}
```

### Slot Objects

A `Slot` is a reactive container from the `rune-hub` library.
When you pass a `Slot` directly as a `JSXElement` or attribute value, `rundom` automatically subscribes to it and updates the DOM when the slot's value changes.

```tsx
//! Slot Elements
import { Slot } from 'rune-hub'

const SlotComponent = () => {
  const message = new Slot(() => 'Hello')
  
  return message
}
```

You can pass slots directly as children or attributes:

```tsx
//! Slot as Children & Attributes
import { Slot } from 'rune-hub'

const StyledText = () => {
  const text = new Slot(() => 'Hello')
  const color = new Slot(() => 'red')
  
  return (
    <div>
      <p style={{ color }}>{text}</p>
      <button onclick={() => text.set('Hi!')}>
        Update
      </button>
    </div>
  )
}
```

### No Re-Rendering

`rundom` **never re-executes the component function**.
When state changes, only the specific DOM properties bound to that state are updated.

```tsx
//! Surgical Updates
import { Slot } from 'rune-hub'

const SurgicalUpdate = () => {
  const color = new Slot(() => 'red')
  
  const handleClick = () => {
    color.set('blue')
  }
  
  console.log('Rendered') // Only logs once
  
  return (
    <div>
      <p style={{ color }}>
        Text color updates
      </p>
      <button onclick={handleClick}>
        Change Color
      </button>
    </div>
  )
}
```

When you click the button, the paragraph's color changes instantly, but the component function is **not** called again.
`rundom` directly updates the `style.color` property in the real DOM.

## What's Next?
---

Now that you understand `JSXElement` types, explore related concepts:

- **[JSX DOM Elements](/jsx-dom-elements)** — Detailed guide on HTML elements, attributes, events, and styling.
- **[Components](/components)** — Build reusable component patterns with props and children.
- **[State Management](/state-management)** — Master reactive state with `rune-hub`.
- **[\<Show>](/show) / [\<Hide>](/hide)** — Conditionally render or hide content based on reactive state.
- **[\<For>](/for)** — Efficiently render lists with automatic DOM reconciliation.
- **[Ref](/ref)** — Access raw DOM elements directly.
