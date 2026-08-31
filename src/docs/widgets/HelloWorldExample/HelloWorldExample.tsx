import { Example } from '../../components'
import text from './HelloWorldExample.md'

export function HelloWorldExample () {
  return (
    <Example description={text} children='Hello World!' />
  )
}
