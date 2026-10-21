import type { HighlightExamples } from '@docs/ui'

import { Box, CheckIcon, Flex } from '../../../../ui'
import { MarkdownTemplate } from '../../../templates'
import description from './BoxPage.md'

const colors = ['primary', 'secondary', 'accent', 'success', 'warning', 'danger', 'disabled'] as const

export default function BoxPage () {
  const examples: HighlightExamples = {
    basic: (
      <Flex gap={8} align='center'>
        <Box />
        <Box>
          Default box
        </Box>
      </Flex>
    ),
    view: (
      <Flex gap={8} align='center' wrap>
        <Box view='filled'>filled</Box>
        <Box view='bordered'>bordered</Box>
        <Box view='dashed'>dashed</Box>
        <Box view='ghost'>ghost</Box>
      </Flex>
    ),
    interact: (
      <Flex vertical gap={8}>
        <Flex gap={8} wrap>
          hoverable:
          <Box interact='hoverable' view='filled'>filled</Box>
          <Box interact='hoverable' view='bordered'>bordered</Box>
          <Box interact='hoverable' view='dashed'>dashed</Box>
          <Box interact='hoverable' view='ghost'>ghost</Box>
        </Flex>
        <Flex gap={8} wrap>
          clickable:
          <Box interact='clickable' view='filled'>filled</Box>
          <Box interact='clickable' view='bordered'>bordered</Box>
          <Box interact='clickable' view='dashed'>dashed</Box>
          <Box interact='clickable' view='ghost'>ghost</Box>
        </Flex>
      </Flex>
    ),
    color: (
      <Flex vertical gap={8}>
        <Flex gap={8} wrap>
          filled:
          {colors.map(color => (
            <Box view='filled' interact='clickable' color={color}>{color}</Box>
          ))}
        </Flex>
        <Flex gap={8} wrap>
          bordered:
          {colors.map(color => (
            <Box view='bordered' interact='clickable' color={color}>{color}</Box>
          ))}
        </Flex>
        <Flex gap={8} wrap>
          dashed:
          {colors.map(color => (
            <Box view='dashed' interact='clickable' color={color}>{color}</Box>
          ))}
        </Flex>
        <Flex gap={8} wrap>
          ghost:
          {colors.map(color => (
            <Box view='ghost' interact='clickable' color={color}>{color}</Box>
          ))}
        </Flex>
      </Flex>
    ),
    size: (
      <Flex gap={16} align='center' wrap>
        <Box size='xxs'>xxs</Box>
        <Box size='xs'>xs</Box>
        <Box size='s'>s</Box>
        <Box size='m'>m</Box>
        <Box size='l'>l</Box>
        <Box size='xl'>xl</Box>
        <Box size='xxl'>xxl</Box>
      </Flex>
    ),
    square: (
      <Flex gap={16} align='center' wrap>
        <Box square size='xxs'>1</Box>
        <Box square size='xs'>1</Box>
        <Box square size='s'>1</Box>
        <Box square size='m'>1</Box>
        <Box square size='l'>1</Box>
        <Box square size='xl'>1</Box>
        <Box square size='xxl'>1</Box>
      </Flex>
    ),
    circle: (
      <Flex gap={16} align='center' wrap>
        <Box circle square size='xxs'>1</Box>
        <Box circle square size='xs'>1</Box>
        <Box circle square size='s'>1</Box>
        <Box circle square size='m'>1</Box>
        <Box circle square size='l'>1</Box>
        <Box circle square size='xl'>1</Box>
        <Box circle square size='xxl'>1</Box>
      </Flex>
    ),
    radiobox: (
      <Flex gap={8} align='center'>
        <Box interact='clickable' circle view='bordered' size='s' />
        <Box interact='clickable' circle view='bordered' size='s'>
          <Box circle size='xxs' />
        </Box>
      </Flex>
    ),
    checkbox: (
      <Flex gap={8} align='center'>
        <Box interact='clickable' view='bordered' size='s' />
        <Box interact='clickable' view='bordered' size='s'>
          <Box size='xxs' />
        </Box>
        <Box interact='clickable' view='bordered' square size='s'>
          <CheckIcon stroke-width='4' />
        </Box>
        <Box interact='clickable' square size='s'>
          <CheckIcon stroke-width='4' />
        </Box>
      </Flex>
    ),
  }

  return (
    <MarkdownTemplate text={description} examples={examples} />
  )
}
