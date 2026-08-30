import { Slot } from 'rune-hub'

import { Flex, Markdown, Typography, View } from '../../ui'
import text from './CountExample.md'

const count = new Slot(() => 0)
const inc = () => count.value++

export function CountExample () {
  return (
    <Flex gap={32} align='center'>
      <Typography style={{ width: '480px' }}>
        <Markdown text={text} />
      </Typography>
      <View title='View' style={{ width: '320px' }}>
        <button onclick={inc}>
          Count: {count}
        </button>
      </View>
    </Flex>
  )
}
