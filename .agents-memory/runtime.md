---
description: no-VDOM execution model, reactive types (Slot, ObservableProp) and inject/injectAll/use. Read when touching the runtime, JSX mounting or reactivity.
updated: 2026-10-22
---

# Core Runtime Concepts

## 1. No VDOM and no re-renders

- A component function runs **exactly once** on mount.
- The `rundom(...)` runtime creates real DOM elements immediately.
- Surgical updates: when a `Slot` changes, only the specific DOM attribute, style property, or text node is updated.

## 2. Reactive types (`types.ts`)

- `Slot<T>` from `rune-hub` is the base reactive container (similar to TC39 Signals).
- `ObservableProp<T>` = `T | (() => T) | Slot<T>`. Component props accept static values as well as getters or `Slot`s.
- `BaseJSXElement` / `JSXElement`: the runtime natively mounts strings, numbers, real `HTMLElement`/`SVGElement`, `Slot`s, getter functions, arrays, and also `Promise<BaseJSXElement>` (in combination with `<Suspense>`).

## 3. Reactivity helpers (`src/utils`)

- `inject(prop, fn)`: if `prop` is dynamic (a `Slot` or a function), returns a getter function with a subscription, `() => fn(use(prop))`; otherwise returns `fn(prop)` immediately.
- `injectAll([a, b], ([a, b]) => ...)`: reactive composition of several props (becomes dynamic if at least one argument is dynamic).
- `use(val)`: extracts the current value from a `Slot`, a getter, or a constant.
