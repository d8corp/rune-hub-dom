---
description: npm scripts and development rules (comments, JSDoc, styles, verification). Read before running commands or finishing a change.
updated: 2026-10-22
---

# Commands and Scripts

- `npm test`: run tests (Jest + JSDOM).
- `npm run lint` / `npm run lint:fix`: code linting (ESLint).
- `npm run build:theme`: rebuild the `theme.scss` theme into `.env.theme`.
- `npm run dev`: rebuild the theme and start the docs playground via InnetJS.
- `npm run build`: build the library into `release/`.

# Development Rules

- **No unnecessary comments** in code unless the user explicitly asks for them.
- Try to add JSDoc comments to public APIs.
- Component library styles are written in `theme.scss` following the BEM-like convention (`.component_modifier`), not in local CSS files.
- Always verify changes at the end of a response (except for changes to .md files or similar) by running `npm run lint` and `npm test`.
