## Router

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
