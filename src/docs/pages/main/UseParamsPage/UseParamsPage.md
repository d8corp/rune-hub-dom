# useParams

Access all route parameters at once as a reactive object.
Use `useParams` when you need to work with multiple parameters, iterate over them, or pass them as a group to other functions.

## Basic Usage
---

Get all route parameters by calling `useParams`.
The returned object contains all dynamic segments from the matched route.

```tsx
import { Router, createRouting, ChildrenProps, useParams } from 'rundom'

const UserPage = (props: ChildrenProps) => {
  const params = useParams()
  
  return <div>{() => params.value.userId}</div>
}

const routing = createRouting([
  { index: true, component: () => 'Home page' },
  {
    index: true,
    path: 'user/:userId',
    component: UserPage,
  },
  { component: () => 'Not Found' }
])

export const Content = () => (
  <Router routing={routing}/>
)
```

`/` - Home page  
`/user/123` - `<div>123</div>`   
`/user` - Not Found

## What's Next?
---

- Learn about [useParam](/use-param) for accessing individual parameters
- Explore the [Router](/router) component for defining routes
- Use [Link](/link) component for navigation between routes
