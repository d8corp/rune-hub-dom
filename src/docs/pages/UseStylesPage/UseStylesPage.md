# useStyles

```tsx
//! src/Content.tsx
import { useStyles, StyledProps } from 'rundom'

import $styles from './Content.module.scss'
// or you can use an object like
// { root: '...', header: '...', content: '...' }

export interface ContentProps extends StyledProps<typeof $styles> {}

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
