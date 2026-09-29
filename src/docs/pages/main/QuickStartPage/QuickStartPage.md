# Quick Start

This guide will take you from an empty directory to a running application, help you understand the core building blocks, and prepare your project for production.

### Prerequisites

- **Node.js** 22 or higher
- **Package manager**: npm, yarn, or pnpm
- **Browser**: Any modern browser supporting ES6+

## Getting Started
---
Feel free to use any preferred tooling.
This section covers the setup for [Vite](/) and [InnetJS](https://www.npmjs.com/package/innetjs).

```shell
//! Vite
npm create vite@latest my-app -- --template rundom
//! InnetJS
npx innetjs init my-app --template rundom
```

> The `--template rundom` flag creates a `rundom` frontend template, and `my-app` is the working folder.

This creates a ready-to-use project with component examples, configured routing, a development server with TypeScript + JSX setup, and an optimized build pipeline.

```
//! Vite structure
my-app/
├── public/
├── index.html         // HTML shell
├── src/
│   └── index.tsx      // Application entry point
├── tsconfig.json      // TypeScript and JSX configuration
└── package.json
//! Innet structure
my-app/
├── public/
│   └── index.html     // HTML shell
├── src/
│   └── index.tsx      // Application entry point
├── tsconfig.json      // TypeScript and JSX configuration
└── package.json
```

Let's look under the hood of your new project. 
The following steps break down the generated files, explain how they work together, and show you how to run and build your app.

## The Entry Point
---

Open `src/index.tsx`. This is where your application comes to life:

```tsx
//! src/index.tsx
import { rundom } from 'rundom'

function App () {
  return (
    <div>
      <h1>Hello, Innet!</h1>
      <p>Your first reactive application</p>
    </div>
  )
}

rundom(<App />)
```

The `rundom()` function takes your root JSX component and mounts it to the DOM.

## HTML Shell
---

Next, look at `index.html`.
This is the shell that hosts your app:

```html
//! Vite
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Innet App</title>
    <script type="module" defer src="/src/index.tsx"></script>
  </head>
  <body>
    <!-- rundom automatically injects your app here -->
  </body>
</html>
//! InnetJS
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Innet App</title>
    <script type="module" defer src="index.js"></script>
  </head>
  <body>
    <!-- rundom automatically injects your app here -->
  </body>
</html>
```

By default, `rundom` attaches your application directly to `document.body`.
If you prefer to mount your app inside a specific wrapper (like `<div id="root">`), you can easily do so using the built-in [Portal](/portal) component.

## TypeScript & JSX
---

To ensure TypeScript understands JSX syntax of `rundom`, the CLI configures `tsconfig.json` like this:

```json
//! tsconfig.json
{
  "compilerOptions": {
    "rootDir": "src",
    "target": "ES2018",
    "lib": [ "dom", "dom.iterable", "esnext" ],
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "jsx": "react-jsx",
    "jsxImportSource": "rundom"
  },
  "include": [ "src" ]
}
```

> Make sure you add `"jsx": "react-jsx"` and `"jsxImportSource": "rundom"` to use JSX.

## Development Server
---

If you haven't already, fire up the development server:

```shell
//! Terminall
npm start
```

The Vite or InnetJS CLI acts as your bundler and dev server, providing TypeScript compilation, JSX transformation, and lightning-fast rebuilds.

## Build for Production
---

Once you are happy with your app and ready to deploy, you need to create an optimized production bundle:

```shell
//! Terminall
npm run build
```

This compiles your application, applies minification, tree-shaking, and other optimizations.
The final static files are written to a `build` folder by default.
Because `rundom` ships a fully static bundle, there is no server-side runtime required — you can deploy the `build` folder to any static hosting provider (Netlify, Vercel, GitHub Pages, AWS S3, etc.).

## What's Next?
---

Now that you have a working [Rundom](/) application, explore more advanced features:

### Core Concepts

- **[JSX Elements](/jsx-elements)** — Understand renderable values, `BaseJSXElement`, and reactivity.
- **[JSX DOM Elements](/jsx-dom-elements)** — Work with HTML/SVG elements, attributes, styling, and events.
- **[Components](/components)** — Learn about component patterns, props, children, and lifecycle hooks like `useEffect`.
- **[State Management](/state-management)** — Deep dive into reactive state with `rune-hub`.

### Control Flow

- **[\<Show>](/show) / [\<Hide>](/hide)** — Conditionally render or hide content based on reactive state.
- **[\<For>](/for)** — Efficiently render lists with automatic DOM reconciliation.

### Routing & Navigation

- **[\<Router>](/router)** — Build multi-page apps with nested routes, permissions, and lazy loading.
- **[\<Link>](/ui/link)** — Navigate between pages without full page reloads.
- **[useParam](/use-param)** / **[useParams](/use-params)** — Access route parameters in components.

### Async & Layout

- **[\<Lazy>](/lazy)** — Lazy load components on demand with fallback support.
- **[\<Suspense>](/suspense)** — Display fallback content while asynchronous operations are pending.
- **[\<Delay>](/delay)** — Delay showing or hiding components.
- **[\<Portal>](/portal)** — Render content in different DOM locations (modals, tooltips).

### Styling & Utilities

- **[useStyles](/use-styles)** — Scoped and dynamic styling for components.
- **[Context](/context)** — Share state across component trees without prop drilling.
- **[Ref](/ref)** — Access DOM elements directly.
