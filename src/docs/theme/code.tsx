import type { CodeProps } from '../..'
import { CodeComponent, message, viewTransition } from '../..'

export function Code (props: CodeProps) {
  return (
    <CodeComponent
      {...props}
      onclick={(e) => {
        navigator.clipboard.writeText((e.target as HTMLDivElement).innerText)

        viewTransition(() => {
          message('Copied to clipboard')
          props.onclick?.(e)
        })
      }}
    />
  )
}
