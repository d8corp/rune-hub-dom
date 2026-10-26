import { Button, Flex } from '../../../ui'
import { Example } from '../../components'
import text from './UIExample.md'

export function UIExample () {
  return (
    <Example description={text}>
      <Flex gap={8}>
        <Button>Button</Button>
        <Button view='filled'>
          Button
        </Button>
        <Button view='filled' color='accent'>
          Button
        </Button>
      </Flex>
    </Example>
  )
}
