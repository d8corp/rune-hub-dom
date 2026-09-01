# Portal

| Prop              | Type                                  | Description                                               |
|-------------------|---------------------------------------|-----------------------------------------------------------|
| **parent** [*](#) | `TargetElement` \| `DocumentFragment` | The element where the child content will be rendered      |
| **children**      | `JSX.Element`                         | The content to render inside the specified parent element |

If you want to render content into an element other than `body`, use the `Portal` component.

```html
//! public/index.html
<!doctype html>
<html lang="en">
<head ... >
<body>
  <div id="app"></div>
  <!-- add this ^ -->
</body>
</html>
```

Use a `Portal` to render content into the `app` element.

```tsx
//! src/index.tsx
import { rundom, Portal } from 'rundom'

rundom(
  <Portal to={document.getElementById('app')!}>
    <h1>
      Hello World!
    </h1>
  </Portal>
)
```

You can use `Portal` anywhere inside your app.

```tsx
//! src/index.tsx
import { rundom, Portal } from 'rundom'

const myElement = document.createElement('div')

rundom(
  <Portal to={document.getElementById('app')}>
    <h1>
      Hello World!
    </h1>
    <Portal to={myElement}>
      This is content of myElement
    </Portal>
  </Portal>
)
```

`myElement` should contain **This is content of myElement** and `app` should contain the following code:

```html
//! Content of `app`
<h1>
  Hello World!
</h1>
```
