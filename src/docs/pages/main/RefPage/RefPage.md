# Ref

`Ref` provides a way to access DOM elements directly in your components.
Create a `Ref` instance and attach it to an element using the `ref` attribute:

```tsx
//! Basic ref example
import { Ref, useEffect } from 'rundom'

function Content () {
  const root = new Ref<HTMLDivElement>()

  useEffect(() => {
    // Access the DOM element through root.value
    console.log(root.value)
    // <div>Hello World!</div>
  })
  
  return (
    <div ref={root}>
      Hello World!
    </div>
  )
}
```

The `Ref` is populated after the component mounts, so you should access `ref.value` inside `useEffect` or event handlers, not during render.

## Multiple Refs
---

You can manage multiple refs in a single component for complex interactions:

```tsx
//! Different element types
import { Ref, useEffect } from 'rundom'

function MediaForm () {
  const inputRef = new Ref<HTMLInputElement>()
  const canvasRef = new Ref<HTMLCanvasElement>()
  const videoRef = new Ref<HTMLVideoElement>()
  
  useEffect(() => {
    // Type-safe access to specific element properties
    console.log(inputRef.value?.type)           // "text"
    console.log(canvasRef.value?.width)         // 800
    console.log(videoRef.value?.duration)       // video duration
  })
  
  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Enter text" />
      <canvas ref={canvasRef} width={800} height={600} />
      <video ref={videoRef} src="/video.mp4" />
    </div>
  )
}
```

## Conditional Refs
---

When using refs with conditional rendering components like `Show` or `Hide`, ensure the ref exists before accessing it:

```tsx
//! Conditional refs with Show
import { Ref, Show } from 'rundom'
import { Slot } from 'rune-hub'

function ConditionalForm () {
  const isAdvanced = new Slot(() => false)
  const advancedInputRef = new Ref<HTMLInputElement>()

  const toggleAdvanced = () => {
    isAdvanced.value = !isAdvanced.value
    advancedInputRef.value?.focus()
  }

  return (
    <div>
      <button onclick={toggleAdvanced}>
        Toggle Advanced Options
      </button>

      <Show when={isAdvanced}>
        <input
          ref={advancedInputRef}
          placeholder='Advanced setting'
        />
      </Show>
    </div>
  )
}
```

## What's Next?
---

Now that you understand how to work with refs, explore related concepts:

- **[Components](/components)** — Learn about component lifecycle and how refs fit into the rendering process.
- **[useEffect](/use-effect)** — Deep dive into side effects and cleanup patterns with refs.
