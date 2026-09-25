import type { CodeProps, UITransformer } from '../..'
import { message, viewTransition } from '../..'

const transformer: UITransformer<CodeProps> = (Code) => (props) => {
  return (
    <Code
      {...props}
      onclick={(e: PointerEvent) => {
        navigator.clipboard.writeText((e.target as HTMLDivElement).innerText)

        viewTransition(() => {
          message('Copied to clipboard')

          // @ts-expect-error: this
          props.onclick?.(e)
        })
      }}
    />
  )
}

export default transformer
