# Styling

You can style components with `useStyles` hook.

Use this hook inside a component to get [html-classes](https://www.npmjs.com/package/html-classes) features on `class` prop.

```tsx
//! src/Content.tsx
import { useStyles, Style } from 'rundom'

import $styles from './Content.scss'
// or you can use an object like
// { root: '...', header: '...', content: '...' }

export interface ContentProps extends Style<typeof $styles> {}

export function Content (props: ContentProps) {
  const styles = useStyles($styles, props.class)

  return (
    <div class={styles.root}>
      <header class={styles.header}>
        header
      </header>
      <main class={styles.content}>
        content
      </main>
    </div>
  )
}
```

Then you can use `class` prop to define classes.

```typescript jsx
//! src/index.tsx
import { rundom } from 'rundom'
import { Slot } from 'rune-hub'

const show = new Slot(() => true)

const handleClick = () => {
  show.value = !show.value
}

rundom(
  <>
    <Content
      class={{
        root: 'root',
        header: ['header', 'another-class'],
        content: [
          'content',
          () => show.value && 'show'
        ],
      }}
    />
    <button
      onclick={handleClick}>
      Hide
    </button>
  </>
)
```
