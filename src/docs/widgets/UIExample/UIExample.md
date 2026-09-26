## Rundom UI

Build interfaces faster with the built-in [UI-kit](/ui).
Rundom ships with a ready-to-use set of components to accelerate your development workflow without sacrificing its lightweight nature.

```tsx
//! index.tsx
import { rundom, Button, Flex } from 'rundom'

rundom(
  <Flex gap={8}>
    <Button>Button</Button>
    <Button color='primary'>
      Button
    </Button>
    <Button color='accent'>
      Button
    </Button>
  </Flex>
)
```
