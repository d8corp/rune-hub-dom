# AGENTS.md

`rundom` is a UI component library and reactive DOM runtime built on `rune-hub` reactivity (signals via `Slot`).

> **Status: WIP.** The library is under active development; architectural decisions and the API may change. Prefer minimal, targeted changes and follow the patterns already established in the project.

---

## Core Runtime Concepts

1. **No VDOM and no re-renders:**
   - A component function runs **exactly once** on mount.
   - The `rundom(...)` runtime creates real DOM elements immediately.
   - Surgical updates: when a `Slot` changes, only the specific DOM attribute, style property, or text node is updated.

2. **Reactive types (`types.ts`):**
   - `Slot<T>` from `rune-hub` is the base reactive container (similar to TC39 Signals).
   - `ObservableProp<T>` = `T | (() => T) | Slot<T>`. Component props accept static values as well as getters or `Slot`s.
   - `BaseJSXElement` / `JSXElement`: the runtime natively mounts strings, numbers, real `HTMLElement`/`SVGElement`, `Slot`s, getter functions, arrays, and also `Promise<BaseJSXElement>` (in combination with `<Suspense>`).

3. **Reactivity helpers (`src/utils`):**
   - `inject(prop, fn)`: if `prop` is dynamic (a `Slot` or a function), returns a getter function with a subscription, `() => fn(use(prop))`; otherwise returns `fn(prop)` immediately.
   - `injectAll([a, b], ([a, b]) => ...)`: reactive composition of several props (becomes dynamic if at least one argument is dynamic).
   - `use(val)`: extracts the current value from a `Slot`, a getter, or a constant.

---

## UI Component Architecture (using `Box` as an example)

The reference implementation is `src/ui/primitive/Box/Box.tsx`. Each component lives in its own directory `src/ui/<category>/<ComponentName>/` with the files `<ComponentName>.tsx` and `index.ts`.

### 1. Connecting styles and theme
```tsx
if (import.meta.env?.RD_THEME_BOX) {
  addCSS(import.meta.env.RD_THEME_BOX, 'box')
}

export const boxStyles = {
  root: import.meta.env?.RD_THEME_BOX__ROOT,
  primary: import.meta.env?.RD_THEME_BOX__PRIMARY,
  // ...other state/modifier classes
}

export type BoxStyles = typeof boxStyles
```
- Styles are built by `buildEnv.ts` from `theme.scss` into `.env.theme`. Selectors like `.box_primary` become variables like `RD_THEME_BOX__PRIMARY`.
- `addCSS` injects the component's compiled CSS into `<head>` once.

### 2. Props typing
- Public props are built with `Merge<ParentProps, OwnProps>`.
- Inheritance comes from the underlying primitive (`BoxProps<T, S>` extends `FlexProps<T, S>`).
- All configurable props are wrapped in `ObservableProp<T>`:
```tsx
export type BoxProps<T extends FlexElement = 'div', S extends BoxStyles = BoxStyles> = Merge<FlexProps<T, S>, {
  color?: ObservableProp<RDColor>
  size?: ObservableProp<BoxSize>
  view?: ObservableProp<BoxView>
  square?: ObservableProp<boolean | 'left' | 'right'>
  circle?: ObservableProp<boolean>
  interact?: ObservableProp<BoxInteract | undefined>
}>
```

### 3. Component implementation (`XxxComponent`)
- Static defaults are destructured (`size = 'm'`, `color = 'primary'`).
- `useStyles(boxStyles, props.class)` merges the theme's default classes with user-provided ones (supports string classes, class objects, and reactive properties).
- Classes are bound reactively via `inject` / `injectAll` and combined with `classes` from `html-classes`.
- The base primitive or HTML tag is rendered:
```tsx
export function BoxComponent<T extends FlexElement = 'div', S extends BoxStyles = BoxStyles> ({
  size = 'm',
  color = 'primary',
  ...props
}: BoxProps<T, S>) {
  const styles = useStyles(boxStyles, props.class)

  const root = injectAll([
    styles.root,
    inject(color, color => styles[color]),
    inject(size, size => styles[size]),
  ], classes)

  return <Flex {...props as FlexProps<T, S>} class={root} />
}
```

### 4. Support for overriding via env
The component export is wrapped in a check for external customization (allows swapping the implementation without forking):
```tsx
export const Box = import.meta.env?.RD_UI_BOX
  ? import.meta.require?.(import.meta.env.RD_UI_BOX).Box as typeof BoxComponent
  : BoxComponent
```

### 5. `index.ts`
Contains only a re-export: `export * from './Box'`.

---

## Repository Structure

- `src/rundom.ts`: the core runtime for mounting JSX into the DOM (`rundom()`).
- `src/jsx-runtime.ts` and `src/jsx-dev-runtime.ts`: custom JSX runtime.
- `src/components/`: built-in control components:
   - `<Show>` / `<Hide>`: conditional rendering.
   - `<For>`: reactive list rendering with DOM reconciliation (LCS algorithm).
   - `<Router>` / `createRouting`: router with support for `useParam`, `useParams`, nesting, and guards.
   - `<Suspense>` / `<Lazy>` / `<Delay>`: async boundaries and deferred rendering.
   - `<Portal>`: rendering outside the main tree (into `document.body` or an arbitrary node).
   - `<Try>`: catching rendering errors.
- `src/ui/`: design system, split into layers:
   - `primitive/` (`Flex`, `Box`, `Link`, `Spin`)
   - `layout/` (`Card`, `Scrollbar`)
   - `block/` (`Button`, `Field`)
   - `inline/` (`Code`, `Divider`)
   - `interaction/` (`Input`, `CheckBox`, `RadioBox`)
   - `typography/` (`Text`, `Typography`, `Markdown`)
   - `popup/` (`Window`, `Message`, ...)
   - `widget/` (`Devtools`, ...)
   - `icons/`
- `src/hooks/`: lifecycle and style hooks (`useStyles`, `useEffect`, `useOnce`, `useClear`, `useCtx`, `useUIProps`).
- `src/utils/`: utilities for context (`Context`), reactivity (`inject`, `injectAll`, `use`), DOM, and styles (`addCSS`).
- `src/docs/`: documentation site and interactive component playground. Pages are built from pairs of `<Name>Page.tsx` + `<Name>Page.md`.
- `theme.scss` + `buildEnv.ts`: the unified theme design system. `npm run build:theme` compiles it into `.env.theme`.

---

## Commands and Scripts

- `npm test`: run tests (Jest + JSDOM).
- `npm run lint` / `npm run lint:fix`: code linting (ESLint).
- `npm run build:theme`: rebuild the `theme.scss` theme into `.env.theme`.
- `npm run dev`: rebuild the theme and start the docs playground via InnetJS.
- `npm run build`: build the library into `release/`.

---

## Development Rules

- **No unnecessary comments** in code unless the user explicitly asks for them.
- Try to add JSDoc comments to public APIs.
- Component library styles are written in `theme.scss` following the BEM-like convention (`.component_modifier`), not in local CSS files.
- Always verify changes at the end of a response (except for changes to .md files or similar) by running `npm run lint` and `npm test`.
