# useParam

Extract individual route parameters from the current URL. Use `useParam` to access dynamic segments defined in your route paths.

## Basic Usage
---
Define a parameter with `:` prefix in the path, then extract it by name.

```tsx
//! src/Content.tsx
import { Router, createRouting, useParam } from 'rundom'

const UserPage = () => {
  const userId = useParam('userId')
  
  return <div>User Profile: {userId}</div>
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
`/user/123` - `<div>User Profile: 123</div>`   
`/user` - Not Found

## Optional Parameters
---

You can use square brackets and `|` to specify allowed values for a param.
You can use `?` to set optional param.

```tsx
//! src/Content.tsx
import { Router, createRouting, useParam } from 'rundom'

const Home = () => {
  const lang = useParam('lang')

  return <>Home: {lang || 'en'}</>
}

const About = () => {
  const lang = useParam('lang')
  
  return <>About: {lang || 'en'}</>
}

const NotFound = () => 'NotFound Page'

const routing = createRouting([
  {
    path: ':lang[en|ru]?',
    children: [
      { index: true, component: Home },
      { index: true, path: 'about', component: About },
    ]
  },
  { component: NotFound },
])

export const Content = () => (
  <Router routing={routing} />
)
```

`/` - Home: en  
`/en` - Home: en  
`/ru` - Home: ru  
`/about` - About: en  
`/en/about` - About: en  
`/ru/about` - About: ru  
`/de/about` - Not Found  
`/de` - Not Found

## What's Next?
---

- Explore the [Router](/router) component for defining routes
- Learn about [useParams](/use-params) for accessing all parameters at once
- Use [Link](/link) component for navigation between routes
