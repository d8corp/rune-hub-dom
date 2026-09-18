import { Button } from '../../../ui'
import { Example } from '../../components'
import text from './UIExample.md'

export function UIExample () {
  return (
    <Example description={text}>
      <Button>I am Button</Button>
    </Example>
  )
}
