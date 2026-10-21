# AGENTS.md

`rundom` is a UI component library and reactive DOM runtime built on `rune-hub` reactivity (signals via `Slot`). No VDOM: components run once, `rundom()` creates real DOM immediately, and updates patch only the affected attribute, style property, or text node.

> **Status: WIP.** Architectural decisions and the API may change. Prefer minimal, targeted changes and follow the patterns already established in the project.

## Project memory (.agents-memory/)
Read a file in full only if the task touches its topic. After working, update the files and this index.

<!-- agents-memory:index:start -->
- [.agents-memory/runtime.md](.agents-memory/runtime.md) — no-VDOM execution model, reactive types (Slot, ObservableProp) and inject/injectAll/use. Read when touching the runtime, JSX mounting or reactivity.
- [.agents-memory/ui-components.md](.agents-memory/ui-components.md) — component folder layout, theme styles, props typing, implementation pattern, env overrides. Read before adding or changing a UI component.
- [.agents-memory/structure.md](.agents-memory/structure.md) — repository layout: built-in components, UI layers, hooks, utils, docs and theme. Read when adding files or locating code.
- [.agents-memory/workflow.md](.agents-memory/workflow.md) — npm scripts and development rules (comments, JSDoc, styles, verification). Read before running commands or finishing a change.
<!-- agents-memory:index:end -->
