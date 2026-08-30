# Ref

`Ref` helps to get an HTML element.

```tsx
import { Ref, useEffect } from 'rundom'

function Content () {
  const wrapper = new Ref<HTMLDivElement>()

  useEffect(() => console.log(wrapper.value))
  
  return (
    <div ref={wrapper}>
      Hello World!
    </div>
  )
}
```
