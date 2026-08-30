import { Flex, Markdown, Typography, View } from '../../ui'
import text from './HelloWorldExample.md'

export function HelloWorldExample () {
  return (
    <Flex gap={32} align='center'>
      <Typography style={{ width: '480px' }}>
        <Markdown text={text} />
      </Typography>
      <View title='View' children='Hello World!' style={{ width: '320px' }} />
    </Flex>
  )
}
