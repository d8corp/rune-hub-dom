## Router

Use the built-in routing system to easily manage client-side navigation and dynamic pages.
See the [\<Router>](/router) documentation for a complete API overview.

```tsx
//! index.tsx
import { 
  rundom,
  createRouting,
  Router,
} from 'rundom'

const Home = () => 'Home Page'
const About = () => 'About Page'
const NotFound = () => 'NotFound Page'

const routing = createRouting([
  { index: true, component: Home },
  { path: 'about', component: About },
  { component: NotFound },
])

rundom(<Router routing={routing} />)
```
