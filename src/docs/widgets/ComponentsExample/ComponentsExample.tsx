import { Example } from '../../components'
import text from './ComponentsExample.md'

export function ComponentsExample () {
  return (
    <Example description={text}>
      <p>Hello World!</p>
    </Example>
  )
}
