# Suspense

| Prop         | Type          | Description                                                          |
|--------------|---------------|----------------------------------------------------------------------|
| **fallback** | `JSX.Element` | Element to display while waiting for asynchronous content to resolve |
| **children** | `JSX.Element` | Content to render when asynchronous operations are complete          |

The `<Suspense>` component coordinates asynchronous rendering in your application.
It displays a fallback element (such as a loading spinner or skeleton placeholder) while waiting for asynchronous components or promises to resolve.

## Basic Usage
---

In `rundom`, components can be asynchronous functions (`async () => ...`).
When wrapped inside `<Suspense>`, the fallback content is rendered until the component finishes loading:

```tsx
import { Suspense } from 'rundom'

async function UserProfile () {
  const response = await fetch('/api/user')
  const user = await response.json()

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  )
}

export default () => (
  <Suspense fallback={<div>Loading user profile...</div>}>
    <UserProfile />
  </Suspense>
)
```

## Promises as Children
---

`rundom` natively supports rendering `Promise<JSXElement>`.
`<Suspense>` automatically tracks pending promises and displays the fallback until they resolve:

```tsx
import { Suspense } from 'rundom'

const statsPromise = fetch('/api/stats')
  .then(res => res.json())
  .then(stats => <span>Total users: {stats.total}</span>)

export default () => (
  <Suspense fallback={<span>Loading stats...</span>}>
    {statsPromise}
  </Suspense>
)
```

## Nested Async Components
---

`<Suspense>` coordinates multiple asynchronous children in its tree, waiting for all nested async components to resolve before mounting the final content:

```tsx
import { Suspense } from 'rundom'

async function Comments () {
  const comments = await fetch('/api/comments').then(res => res.json())

  return (
    <ul>
      {comments.map((comment: { text: string }) => (
        <li>{comment.text}</li>
      ))}
    </ul>
  )
}

async function Article () {
  const post = await fetch('/api/post').then(res => res.json())

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <Comments />
    </article>
  )
}

export default () => (
  <Suspense fallback={<div>Loading article and comments...</div>}>
    <Article />
  </Suspense>
)
```

## Dynamic Async Content
---

When used with reactive conditional components such as `<Show>`, `<Suspense>` dynamically reacts to state changes.
If an async component is triggered conditionally, `<Suspense>` will switch back to the fallback state until the new asynchronous content is ready:

```tsx
import { Suspense, Show } from 'rundom'
import { Slot } from 'rune-hub'

const showDetails = new Slot(() => false)

async function Details () {
  const details = await fetch('/api/details').then(res => res.json())

  return <div>{details.text}</div>
}

export default () => (
  <Suspense fallback={<div>Loading...</div>}>
    <button
      onclick={() => {
        showDetails.value = true
      }}>
      Show Details
    </button>
    <Show when={showDetails}>
      <Details />
    </Show>
  </Suspense>
)
```

## What's Next?
---

- Learn about the [\<Show>](/show) component for conditional rendering
- Explore [\<Hide>](/hide) component for hiding content based on state
- Discover [\<Delay>](/delay) for adding delays to element visibility
- Understand [State Management](/state-management) for managing reactive conditions
- Build multi-page applications with [\<Router>](/router)
