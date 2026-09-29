# Lazy

| Prop                 | Type                                                         | Default      | Description                                                               |
|----------------------|--------------------------------------------------------------|--------------|---------------------------------------------------------------------------|
| **component** [*](#) | `Reactive<LazyResult<C> \| C>` \| `Slot<LazyResult<C> \| C>` |              | Reactive slot or function returning a component or promise of a component |
| **fallback**         | `JSX.Element`                                                | `undefined`  | Element to render while the component is loading                          |
| **show**             | `ObservableProp<boolean>`                                    | `true`       | Condition to determine whether to load and render the component           |
| **render**           | `(Component: C) => JSX.Element`                              | `C => <C />` | Custom render function for the loaded component                           |
| **loadedComponents** | `Map<LazyResult, Component>`                                 | `new Map()`  | Optional cache map of already loaded components                           |

The `<Lazy>` component enables code-splitting and dynamic component loading.
It defers loading a component's code until it is actually needed, reducing the initial bundle size and improving startup performance.

## Basic Usage
---

Use the `lazy()` utility together with dynamic `import()` to define a lazily loaded component:

```tsx
//! src/index.tsx
import { rundom, Lazy, lazy } from 'rundom'

rundom(
  <Lazy
    component={lazy(() => import('./UserProfile'))}
    fallback={<div>Loading profile...</div>}
  />
)
```

The component loaded with `import()` can use either `export default`:

```tsx
//! src/UserProfile.tsx
export default function UserProfile () {
  return (
    <div>
      <h2>User Profile</h2>
      <p>Loaded on demand!</p>
    </div>
  )
}
```

## Custom rendering
---

By default, `<Lazy>` instantiates the loaded component without any props (`<Component />`).
If the component requires props, provide a custom `render` function:

```tsx
//! src/index.tsx
import { rundom, Lazy, lazy } from 'rundom'

rundom(
  <Lazy
    component={lazy(() => import('./UserCard'))}
    fallback={<div>Loading user...</div>}
    render={UserCard => <UserCard id="42" name="Alice" />}
  />
)
```

## Dynamic Component
---

The `component` prop accepts a reactive `Slot`.
When the slot's value changes, `<Lazy>` loads and renders the new component automatically:

```tsx
//! src/index.tsx
import { rundom, Lazy, lazy } from 'rundom'
import { Slot } from 'rune-hub'

const tabOne = lazy(() => import('./TabOne'))
const tabTwo = lazy(() => import('./TabTwo'))

const currentTab = new Slot(() => tabOne)

rundom(
  <div>
    <nav>
      <button onclick={() => currentTab.set(tabOne)}>
        Tab 1
      </button>
      <button onclick={() => currentTab.set(tabTwo)}>
        Tab 2
      </button>
    </nav>
    <main>
      <Lazy
        component={currentTab}
        fallback={<div>Loading tab...</div>}
      />
    </main>
  </div>
)
```

Already loaded components are cached, so switching back to a previously loaded tab renders instantly without re-fetching.

## Conditional Loading
---

Use the `show` prop to delay loading until a condition is met (e.g. when opening a dialog or drawer):

```tsx
//! src/index.tsx
import { rundom, Lazy, lazy } from 'rundom'
import { Slot } from 'rune-hub'

const isOpen = new Slot(() => false)

rundom(
  <div>
    <button onclick={() => isOpen.set(true)}>
      Open Modal
    </button>
    <Lazy
      show={isOpen}
      component={lazy(() => import('./Modal'))}
      fallback={<div>Loading dialog...</div>}
    />
  </div>
)
```

While `show` is falsy, the component script is not fetched and nothing is rendered.

## The lazy utility
---

The `lazy()` helper wraps dynamic `import()` and memoizes the returned promise.
This ensures that multiple references to the same lazy component share a single request:

```tsx
import { lazy } from 'rundom'

// Returns a memoized LazyFn
export const heavyChart = lazy(async () => {
  const { HeavyChart } = await import('./HeavyChart')

  return HeavyChart
})
```

You can also pass `lazy()` components directly to router configurations:

```tsx
import { createRouting, lazy } from 'rundom'

export const routing = createRouting([
  {
    index: true,
    component: lazy(() => import('./HomePage')),
  },
  {
    path: 'settings',
    component: lazy(() => import('./SettingsPage')),
  },
])
```

## What's Next?
---

- Explore [\<Suspense>](/suspense) for coordinating asynchronous operations and fallbacks
- Learn about [\<Router>](/router) for route-based code splitting
- Discover [\<Show>](/show) and [\<Hide>](/hide) for reactive conditional rendering
- Check out [\<Delay>](/delay) for delay-based transitions
