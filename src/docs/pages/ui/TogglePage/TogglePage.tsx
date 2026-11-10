import type { HighlightExamples } from '@docs/ui'
import { get, set, Slot, slot } from 'rune-hub'

import { Button, Flex, Text, Toggle } from '../../../../ui'
import { MarkdownTemplate } from '../../../templates'
import description from './TogglePage.md'

export default function TogglePage () {
  const checkedSlot = new Slot(() => true)
  const volume = () => 50
  const muted = () => get(volume) === 0

  const toggleMute = (checked: boolean) => set(volume, checked ? 0 : 50)

  const examples: HighlightExamples = {
    basic: (
      <Flex gap={8} wrap align='center'>
        <Toggle />
        <Toggle checked />
      </Flex>
    ),
    label: (
      <Flex gap={16} wrap align='center'>
        <Flex element='label' gap={8} align='center'>
          <Toggle />
          <Text cursor='pointer'>Off</Text>
        </Flex>
        <Flex element='label' gap={8} align='center'>
          <Toggle checked />
          <Text cursor='pointer'>On</Text>
        </Flex>
      </Flex>
    ),
    checked: (
      <Flex vertical gap={8}>
        <Flex element='label' gap={8} align='center'>
          <Toggle checked={checkedSlot} />
          <Text cursor='pointer'>Dynamic switch</Text>
        </Flex>
        <Flex gap={8}>
          <Button onclick={() => checkedSlot.set(true)}>On</Button>
          <Button onclick={() => checkedSlot.set(false)}>Off</Button>
        </Flex>
        <div>Current state: {() => String(checkedSlot.value)}</div>
      </Flex>
    ),
    disabled: (
      <Flex vertical gap={8}>
        <Flex gap={8} align='center'>
          <Toggle disabled />
          Disabled
        </Flex>
        <Flex gap={8} align='center'>
          <Toggle checked disabled />
          Disabled and on
        </Flex>
      </Flex>
    ),
    onChange: (
      <Flex vertical gap={8}>
        <Flex element='label' gap={8} align='center'>
          <Toggle checked={slot(muted)} onChange={toggleMute} />
          <Text cursor='pointer'>Mute sound</Text>
        </Flex>
        <Text>Volume: {slot(volume)}%</Text>
      </Flex>
    ),
    inherited: (
      <Flex vertical gap={16}>
        <Flex gap={16} align='center' wrap>
          <Flex gap={8} align='center'><Toggle checked color='primary' />primary</Flex>
          <Flex gap={8} align='center'><Toggle checked color='secondary' />secondary</Flex>
          <Flex gap={8} align='center'><Toggle checked color='accent' />accent</Flex>
          <Flex gap={8} align='center'><Toggle checked color='success' />success</Flex>
          <Flex gap={8} align='center'><Toggle checked color='warning' />warning</Flex>
          <Flex gap={8} align='center'><Toggle checked color='danger' />danger</Flex>
        </Flex>
        <Flex gap={16} align='center' wrap>
          <Flex gap={8} align='center'><Toggle size='xs' />xs</Flex>
          <Flex gap={8} align='center'><Toggle size='m' />m</Flex>
          <Flex gap={8} align='center'><Toggle size='l' />l</Flex>
        </Flex>
      </Flex>
    ),
  }

  return (
    <MarkdownTemplate text={description} examples={examples} />
  )
}
