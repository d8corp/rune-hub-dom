# For

Efficiently render lists of reactive data with automatic DOM reconciliation.
The `<For>` component is optimized for rendering dynamic collections that change over time, minimizing DOM operations by intelligently tracking items through unique keys.

| Prop          | Type                                                  | Description                                               |
|---------------|-------------------------------------------------------|-----------------------------------------------------------|
| **of** [*](#) | `StateProp<Iterable<T>>`                              | The collection to iterate over                            |
| **key**       | `keyof T` \| `(item: T) => any`                       | Unique key for each item, used for DOM optimization       |
| **children**  | `(item: Slot<T>, index: Slot<number>) => JSX.Element` | Function that returns JSX for each item in the collection |

Use `<For>` when working with reactive state collections.
For static data that never changes, the standard JavaScript `map` method is sufficient.

## Basic Usage
---

For static data that won't change, you can use the standard `map` method:

```tsx
//! src/index.tsx
import { rundom } from 'rundom'
const names = ['Mike', 'Alex', 'Dan']

rundom(
  <ul>
    {names.map(name => (
      <li>{name}</li>
    ))}
  </ul>
)
```

However, when working with a reactive state, the `<For>` component provides optimized rendering and automatic updates:

```tsx
//! src/index.tsx
import { rundom, For } from 'rundom'
import { Slot } from 'rune-hub'

const names = new Slot(() => ['Mike', 'Alex', 'Dan'])

rundom(
  <ul>
    <For of={names}>
      {(name, index) => (
        <li>
          #{index}: {name}
        </li>
      )}
    </For>
  </ul>
)
```

The child function receives two reactive parameters:
- `name`: A `Slot` containing the current item
- `index`: A `Slot` containing the current index

## Key Property
---

The `key` tells `<For>` how to identify each item uniquely, enabling efficient updates when the list changes.

```tsx
//! src/index.tsx
import { rundom, For } from 'rundom'
import { Slot } from 'rune-hub'

const users = new Slot(() => [
  { id: 1, name: 'Mike', role: 'Admin' },
  { id: 2, name: 'Alex', role: 'User' },
  { id: 3, name: 'Dan', role: 'Editor' },
])

rundom(
  <ul>
    <For of={users} key='id'>
      {(user, index) => (
        <li>
          #{index}: {() => user.value.name} - {() => user.value.role}
        </li>
      )}
    </For>
  </ul>
)
```

You can also use a function for more complex key generation:

```tsx
//! src/index.tsx
import { rundom, For } from 'rundom'
import { Slot } from 'rune-hub'

const items = new Slot(() => [
  { category: 'fruit', name: 'apple' },
  { category: 'vegetable', name: 'carrot' },
  { category: 'fruit', name: 'banana' },
])

rundom(
  <ul>
    <For of={items} key={(item) => `${item.category}-${item.name}`}>
      {item => (
        <li>
          {() => item.value.category}: {() => item.value.name}
        </li>
      )}
    </For>
  </ul>
)
```

**Why keys matter:** By default, the `key` is the list item itself.
When fetching data from a backend, parsing JSON creates new object references, even if the logical data (like an `id`) is identical.
Since the default key changes, `<For>` unnecessarily recreates the DOM elements.
By explicitly setting a stable `key` (like `item.id`), `<For>` recognizes the item.
It reuses the existing DOM node and only updates the changed data.
This is crucial for performance and for preserving UI state (like input focus)

## Handling Empty
---

Combine `<For>` with the `<Show>` component to display fallback content when a list is empty:

```tsx
//! src/index.tsx
import { rundom, For, Show } from 'rundom'
import { Slot } from 'rune-hub'

const todos = new Slot<Array<{ id: number; text: string }>>(() => [])

rundom(
  <div>
    <Show when={() => todos.value.length === 0}>
      <p>No todos yet. Add your first task!</p>
    </Show>
    
    <Show when={() => todos.value.length > 0}>
      <ul>
        <For of={todos} key='id'>
          {(todo) => (
            <li>{() => todo.value.text}</li>
          )}
        </For>
      </ul>
    </Show>
  </div>
)
```

## Nested Iterations
---

Nest `For` components to render hierarchical data structures like categories with items, nested comments, or tree views:

```tsx
//! Nested For components
import { For } from 'rundom'
import { Slot } from 'rune-hub'

interface Category {
  id: number
  name: string
  products: Array<{ id: number; name: string; price: number }>
}

const categories = new Slot<Category[]>(() => [
  {
    id: 1,
    name: 'Electronics',
    products: [
      { id: 101, name: 'Laptop', price: 999 },
      { id: 102, name: 'Mouse', price: 25 },
    ],
  },
  {
    id: 2,
    name: 'Books',
    products: [
      { id: 201, name: 'JavaScript Guide', price: 45 },
      { id: 202, name: 'TypeScript Handbook', price: 50 },
    ],
  },
])

export default (
  <div>
    <For of={categories} key='id'>
      {(category) => (
        <section>
          <h2>{() => category.value.name}</h2>
          <ul>
            <For of={() => category.value.products} key='id'>
              {(product) => (
                <li>
                  {() => product.value.name} - ${() => product.value.price}
                </li>
              )}
            </For>
          </ul>
        </section>
      )}
    </For>
  </div>
)
```

For deeply nested structures, consider breaking out child components:

```tsx
//! Nested with child components
import { For } from 'rundom'
import { Slot } from 'rune-hub'

interface Comment {
  id: number
  text: string
  author: string
  replies: Comment[]
}

const CommentItem = ({ comment }: { comment: Slot<Comment> }) => (
  <div style="margin-left: 20px">
    <p>
      <strong>{() => comment.value.author}:</strong> {() => comment.value.text}
    </p>
    <For of={() => comment.value.replies} key='id'>
      {(reply) => <CommentItem comment={reply} />}
    </For>
  </div>
)

const comments = new Slot<Comment[]>(() => [
  {
    id: 1,
    text: 'Great article!',
    author: 'Mike',
    replies: [
      { id: 2, text: 'Thanks!', author: 'Alex', replies: [] },
      { id: 3, text: 'Agreed!', author: 'Dan', replies: [] },
    ],
  },
])

export default (
  <div>
    <For of={comments} key='id'>
      {(comment) => <CommentItem comment={comment} />}
    </For>
  </div>
)
```

## Integration with Show/Hide
---

Combine `For` with conditional rendering components to create dynamic, filterable lists:

```tsx
//! Conditional rendering in lists
import { For, Show, Hide } from 'rundom'
import { Slot } from 'rune-hub'

interface Task {
  id: number
  text: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
}

const tasks = new Slot<Task[]>(() => [
  { id: 1, text: 'Review PR', completed: false, priority: 'high' },
  { id: 2, text: 'Write docs', completed: true, priority: 'medium' },
  { id: 3, text: 'Update tests', completed: false, priority: 'low' },
])

const showCompleted = new Slot(() => true)

export default (
  <div>
    <label>
      <input
        type="checkbox"
        checked={showCompleted}
        onchange={(e) => {
          showCompleted.value = e.target.checked
          showCompleted.update()
        }}
      />
      Show completed tasks
    </label>

    <ul>
      <For of={tasks} key='id'>
        {(task) => (
          <>
            <Show when={() => showCompleted.value || !task.value.completed}>
              <li style={() => ({
                textDecoration: task.value.completed ? 'line-through' : 'none',
                color: task.value.priority === 'high' ? 'red' : 'black',
              })}>
                {() => task.value.text}
                <Hide when={() => task.value.completed}>
                  <span> [{() => task.value.priority}]</span>
                </Hide>
              </li>
            </Show>
          </>
        )}
      </For>
    </ul>
  </div>
)
```

Create filtered views without modifying the original data:

```tsx
//! Filtered list view
import { For } from 'rundom'
import { Slot } from 'rune-hub'

interface Product {
  id: number
  name: string
  category: string
  inStock: boolean
}

const products = new Slot<Product[]>(() => [
  { id: 1, name: 'Laptop', category: 'Electronics', inStock: true },
  { id: 2, name: 'Desk', category: 'Furniture', inStock: false },
  { id: 3, name: 'Mouse', category: 'Electronics', inStock: true },
])

const selectedCategory = new Slot(() => 'all')

const filteredProducts = new Slot(() => {
  if (selectedCategory.value === 'all') {
    return products.value
  }
  return products.value.filter((p) => p.category === selectedCategory.value)
})

// Update filteredProducts when dependencies change
products.on(() => filteredProducts.update())
selectedCategory.on(() => filteredProducts.update())

export default (
  <div>
    <select
      onchange={(e) => {
        selectedCategory.value = e.target.value
        selectedCategory.update()
      }}
    >
      <option value="all">All Categories</option>
      <option value="Electronics">Electronics</option>
      <option value="Furniture">Furniture</option>
    </select>

    <ul>
      <For of={filteredProducts} key='id'>
        {(product) => (
          <li>
            {() => product.value.name}
            {() => product.value.inStock ? ' ✓' : ' (Out of stock)'}
          </li>
        )}
      </For>
    </ul>
  </div>
)
```

## What's Next?
---

- Learn about [State Management](/state-management) to manage reactive collections
- Discover [Show](/show) and [Hide](/hide) for conditional rendering
- Build dynamic pages with [Router](/router)
