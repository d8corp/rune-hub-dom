---
description: component folder layout, theme styles, props typing, implementation pattern, env overrides. Read before adding or changing a UI component.
updated: 2026-10-22
---

# UI Component Architecture (using `Box` as an example)

The reference implementation is `src/ui/primitive/Box/Box.tsx`. Each component lives in its own directory `src/ui/<category>/<ComponentName>/` with the files `<ComponentName>.tsx` and `index.ts`.

## 1. Connecting styles and theme

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

## 2. Props typing

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

## 3. Component implementation (`XxxComponent`)

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

## 4. Support for overriding via env

The component export is wrapped in a check for external customization (allows swapping the implementation without forking):

```tsx
export const Box = import.meta.env?.RD_UI_BOX
  ? import.meta.require?.(import.meta.env.RD_UI_BOX).Box as typeof BoxComponent
  : BoxComponent
```

## 5. `index.ts`

Contains only a re-export: `export * from './Box'`.
