import { Example } from '../../components'
import text from './JSXExample.md'

export function JSXExample () {
  return (
    <Example description={text}>
      <b>
        Hello World!
      </b>
    </Example>
  )
}
