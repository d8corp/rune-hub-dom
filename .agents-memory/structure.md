---
description: built-in components, UI layers, hooks, utils, docs and theme. Read when adding files or locating code.
updated: 2026-10-22
---

# Repository Structure

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
