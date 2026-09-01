# Portal

The `Portal` component renders content into a DOM element outside the current component hierarchy.
This is essential for building UI elements that need to break out of their parent's styling context, such as modals, tooltips, notifications, and dropdowns.

| Prop              | Type                                  | Description                                               |
|-------------------|---------------------------------------|-----------------------------------------------------------|
| **parent** [*](#) | `TargetElement` \| `DocumentFragment` | The element where the child content will be rendered      |
| **children**      | `JSX.Element`                         | The content to render inside the specified parent element |

## Basic Usage
---

If you want to render content into an element other than `body`, use the `Portal` component.

```html
//! public/index.html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portal App</title>
</head>
<body>
  <div id="app">
    <!-- Portal will render content here -->
  </div>
</body>
</html>
```

Use a `Portal` to render content into the `app` element:

```tsx
//! src/index.tsx
import { rundom, Portal } from 'rundom'

function App() {
  return (
    <Portal to={document.getElementById('app')!}>
      <h1>Hello World!</h1>
      <p>Rendered inside the app container</p>
    </Portal>
  )
}

rundom(<App />)
```

## What's Next?
---

Now that you understand how to render content outside the component tree, explore these related topics:

- **[Show](/show)** — Conditionally render content, often used with Portals for modals and overlays
- **[Hide](/hide)** — Hide content while keeping it in the DOM, useful for dropdown menus
- **[Context](/context)** — Share state across portal boundaries without prop drilling
- **[Components](/components)** — Learn about component composition patterns that work well with Portals
