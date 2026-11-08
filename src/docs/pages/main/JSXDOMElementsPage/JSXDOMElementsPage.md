# JSX DOM Elements

JSX DOM elements are intrinsic HTML and SVG tags such as `<div>`, `<button>`, or `<svg>`.
Unlike components, they are not functions: `rundom` creates the real DOM element immediately and applies props directly to it.

```tsx
//! Basic Element
import { rundom } from 'rundom'

rundom(
  <button class='primary' onclick={() => console.log('Clicked!')}>
    Click me
  </button>
)
```

Because there is no virtual DOM, `rundom` never re-creates the element.
When a prop is bound to a reactive value, only that attribute, style property, or child text node is updated.

## Element Syntax
---
JSX DOM elements use standard HTML syntax. Tags are lowercase, and void elements such as `img`, `input`, and `br` are self-closing:

```tsx
//! HTML Elements
import { rundom } from 'rundom'

rundom(
  <section class='card'>
    <h1>Profile</h1>
    <img src='/avatar.png' alt='Avatar' />
    <input type='text' placeholder='Your name' />
  </section>
)
```

A tag that starts with a lowercase letter (like `<button>` or `<clipPath>`) creates a DOM element, while a tag that starts with an uppercase letter (like `<Button>`) is treated as a component.

### Children

The content between opening and closing tags becomes the element's children.
Children can be text, expressions, nested JSX elements, arrays, or reactive values:

```tsx
//! Children
import { rundom } from 'rundom'

const items = ['One', 'Two', 'Three']

rundom(
  <ul>
    <li>Static item</li>
    {items.map(item => <li>{item}</li>)}
  </ul>
)
```

String children are inserted as text nodes, so HTML is escaped automatically:

```tsx
//! Escaped Text
rundom(<p>{'<strong>Not HTML</strong>'}</p>)
// Renders the text "<strong>Not HTML</strong>"
```

For reactive lists, use the built-in [\<For>](/for) component instead of mapping over a reactive value manually.

## Attributes
---
Regular props are applied to the element as HTML attributes:

```tsx
//! Attributes
import { rundom } from 'rundom'

rundom(
  <label class='field' for='email'>
    Email
    <input
      id='email'
      type='email'
      name='email'
      placeholder='name@example.com'
      required
    />
  </label>
)
```

Use the native HTML attribute names, not React aliases:

- `class` instead of `className`
- `for` instead of `htmlFor`
- `tabindex` instead of `tabIndex`

Attributes such as `data-*` and `aria-*` are written exactly as in HTML:

```tsx
//! Data and ARIA Attributes
rundom(
  <div
    class='status'
    data-state='loading'
    aria-live='polite'
    aria-busy='true'
  >
    Loading...
  </div>
)
```

### Boolean Attributes

A boolean attribute is added when its value is `true`.
`false`, `undefined`, and an empty string remove the attribute:

```tsx
//! Boolean Attributes
import { rundom } from 'rundom'
import { Slot } from 'rune-hub'

const isDisabled = new Slot(() => true)

rundom(
  <button disabled={isDisabled}>
    Save
  </button>
)

isDisabled.value = false // removes the `disabled` attribute
```

### Reactive Attributes

A `Slot` or a getter function can be used as an attribute value.
`rundom` subscribes to it and updates only that attribute:

```tsx
//! Reactive Attributes
import { rundom } from 'rundom'
import { Slot } from 'rune-hub'

const buttonClass = new Slot(() => 'button')
const isDisabled = new Slot(() => false)
const title = new Slot(() => 'Save changes')

rundom(
  <button
    class={buttonClass}
    disabled={isDisabled}
    title={title}
    onclick={() => console.log('Saved')}
  >
    Save
  </button>
)

buttonClass.value = 'button button_saving'
isDisabled.value = true
title.value = 'Saving...'
```

When a reactive value becomes `false`, `undefined`, or an empty string, the attribute is removed.

## Events
---
Event props use the native DOM event names in lowercase and receive the original browser event:

```tsx
//! Click Event
import { rundom } from 'rundom'

function handleClick (event: MouseEvent) {
  console.log('Clicked', event.currentTarget)
}

rundom(
  <button onclick={handleClick}>
    Click me
  </button>
)
```

Because handlers are assigned to the element's native event properties, use names like `onclick`, `oninput`, `onchange`, `onkeydown`, and `onsubmit`.
Inside the handler, `event.currentTarget` points to the element that owns the handler:

```tsx
//! Input Event
import { rundom } from 'rundom'

function handleInput (event: Event) {
  const input = event.currentTarget as HTMLInputElement

  console.log(input.value)
}

rundom(
  <input
    type='text'
    oninput={handleInput}
    placeholder='Type something'
  />
)
```

Event handlers can read and update state directly:

```tsx
//! Event Updates State
import { rundom } from 'rundom'
import { Slot } from 'rune-hub'

const count = new Slot(() => 0)

rundom(
  <button onclick={() => count.value++}>
    Clicked {count} times
  </button>
)
```

## Styles
---
Pass an object to the `style` prop to apply inline styles.
Use CSS property names in kebab-case and quote them when necessary:

```tsx
//! Inline Styles
import { rundom } from 'rundom'

rundom(
  <div
    style={{
      display: 'grid',
      gap: '12px',
      padding: '16px',
      'background-color': '#f5f5f5',
      'border-radius': '8px',
    }}
  >
    Styled content
  </div>
)
```

CSS custom properties are also supported:

```tsx
//! Custom Properties
import { rundom } from 'rundom'
import { Slot } from 'rune-hub'

const accent = new Slot(() => '#007bff')

rundom(
  <div
    style={{
      '--accent-color': accent,
      'border-color': 'var(--accent-color)',
    }}
  >
    Custom property
  </div>
)
```

Style values can be reactive.
Each property is bound independently, so changing one value does not affect the others:

```tsx
//! Reactive Styles
import { rundom } from 'rundom'
import { Slot } from 'rune-hub'

const color = new Slot(() => '#007bff')
const isVisible = new Slot(() => true)

rundom(
  <div
    style={{
      color,
      display: () => isVisible.value ? 'block' : 'none',
      opacity: () => isVisible.value ? '1' : undefined,
    }}
  >
    Reactive styles
  </div>
)

color.value = '#e5484d'
isVisible.value = false
```

Returning `undefined` from a reactive style value removes that property.
Use `class` for reusable stylesheets and `style` for values that need to change dynamically.

## Refs
---
Use a `ref` prop to access the created DOM element directly:

```tsx
//! Ref
import { Ref, rundom } from 'rundom'

const inputRef = new Ref<HTMLInputElement>()

rundom(
  <div>
    <input ref={inputRef} type='text' />
    <button onclick={() => inputRef.value?.focus()}>
      Focus input
    </button>
  </div>
)
```

The `ref` is populated after the element is created, so access `ref.value` inside event handlers or lifecycle hooks such as `useEffect`, not while declaring the element.

## SVG
---
SVG elements use the same JSX syntax. When the root element is `<svg>`, `rundom` creates descendants in the SVG namespace automatically:

```tsx
//! SVG
import { rundom } from 'rundom'

rundom(
  <svg
    viewBox='0 0 24 24'
    width='24'
    height='24'
    aria-hidden='true'
  >
    <path
      d='M12 2 2 22h20L12 2Z'
      fill='currentColor'
      fill-rule='evenodd'
    />
  </svg>
)
```

Keep the native SVG spelling of attributes, including case-sensitive names such as `viewBox` and `stroke-width`.

## Complete Example
---
The following example binds an event, an attribute, multiple styles, and text content to the same state:

```tsx
//! Reactive Button
import { rundom } from 'rundom'
import { Slot } from 'rune-hub'

const isActive = new Slot(() => false)
const buttonClass = new Slot(() => isActive.value ? 'button button_active' : 'button')
const backgroundColor = new Slot(() => isActive.value ? '#007bff' : '#6c757d')
const textColor = new Slot(() => isActive.value ? '#ffffff' : '#cccccc')
const buttonText = new Slot(() => isActive.value ? 'Active' : 'Inactive')

const toggle = () => {
  isActive.value = !isActive.value
}

rundom(
  <button
    class={buttonClass}
    onclick={toggle}
    style={{
      'background-color': backgroundColor,
      color: textColor,
      padding: '10px 20px',
      border: 'none',
      'border-radius': '4px',
      cursor: 'pointer',
    }}
  >
    {buttonText}
  </button>
)
```

Clicking the button updates the class, two style properties, and the text.
The element itself is created only once, and only the affected DOM properties are patched.

## Best Practices
---
- Use lowercase, native event names: `onclick`, `oninput`, `onsubmit`.
- Use `class` and `for` instead of React's `className` and `htmlFor`.
- Use kebab-case CSS names in `style`, such as `background-color`.
- Bind changing values with `Slot` or getter functions instead of recreating elements.
- Use [\<For>](/for) for reactive lists and [\<Show>](/show) / [\<Hide>](/hide) for conditional content.
- Use [useStyles](/use-styles) to scope styles inside components.

## What's Next?
---
Now that you understand JSX DOM elements, explore these related topics:

- **[JSX Elements](/jsx-elements)** — Learn which values can be rendered and how reactivity works.
- **[Components](/components)** — Build reusable components with props and children.
- **[State Management](/state-management)** — Bind state to attributes, styles, and content with `rune-hub`.
- **[Ref](/ref)** — Work with DOM elements and browser APIs directly.
- **[For](/for)** — Render efficient reactive lists with automatic reconciliation.
- **[useStyles](/use-styles)** — Scoped and dynamic styling for components.
