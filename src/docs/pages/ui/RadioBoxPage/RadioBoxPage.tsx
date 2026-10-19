import type { HighlightExamples } from '@docs/ui'
import { get, set, Slot, slot } from 'rune-hub'

import { message } from '../../../../helpers'
import { Button, Flex, RadioBox, Text } from '../../../../ui'
import { MarkdownTemplate } from '../../../templates'
import description from './RadioBoxPage.md'

export default function RadioBoxPage () {
  const checkedSlot = new Slot(() => true)
  const plan = (): 'basic' | 'pro' => 'basic'
  const isBasic = () => get(plan) === 'basic'
  const isPro = () => get(plan) === 'pro'

  const examples: HighlightExamples = {
    basic: (
      <Flex gap={8} wrap align='center'>
        <RadioBox />
        <RadioBox checked />
      </Flex>
    ),
    label: (
      <Flex gap={8} wrap align='center'>
        <Flex element='label' gap={8} align='center'>
          <RadioBox />
          <Text cursor='pointer'>
            Unchecked
          </Text>
        </Flex>
        <Flex element='label' gap={8} align='center'>
          <RadioBox checked />
          <Text cursor='pointer'>
            Checked
          </Text>
        </Flex>
      </Flex>
    ),
    form: (
      <Flex
        element='form'
        vertical
        gap={8}
        onsubmit={(e) => {
          e.preventDefault()
          const data = new FormData(e.currentTarget as HTMLFormElement)
          message(`Plan: ${data.get('plan') ?? 'none'}`)
        }}
      >
        <Flex element='label' gap={8} align='center'>
          <RadioBox checked name='plan' value='basic' />
          <Text cursor='pointer'>Basic</Text>
        </Flex>
        <Flex element='label' gap={8} align='center'>
          <RadioBox name='plan' value='pro' />
          <Text cursor='pointer'>Pro</Text>
        </Flex>
        <Flex element='label' gap={8} align='center'>
          <RadioBox name='plan' value='team' />
          <Text cursor='pointer'>Team</Text>
        </Flex>
        <Flex gap={8}>
          <Button view='filled' type='submit'>Submit</Button>
          <Button type='reset'>Reset</Button>
        </Flex>
      </Flex>
    ),
    checked: (
      <Flex vertical gap={8}>
        <Flex element='label' gap={8} align='center'>
          <RadioBox checked={checkedSlot} />
          <Text cursor='pointer'>
            Dynamic radio box
          </Text>
        </Flex>
        <Flex gap={8}>
          <Button onclick={() => checkedSlot.set(true)}>True</Button>
          <Button onclick={() => checkedSlot.set(false)}>False</Button>
        </Flex>
        <div>Current state: {() => String(checkedSlot.value)}</div>
      </Flex>
    ),
    disabled: (
      <Flex vertical gap={8}>
        <Flex gap={8} align='center'>
          <RadioBox disabled />
          Disabled
        </Flex>
        <Flex gap={8} align='center'>
          <RadioBox checked disabled />
          Disabled and checked
        </Flex>
      </Flex>
    ),
    onChange: (
      <Flex vertical gap={8}>
        <Flex element='label' gap={8} align='center'>
          <RadioBox checked={isBasic} onChange={() => set(plan, 'basic')} />
          <Text cursor='pointer'>Basic</Text>
        </Flex>
        <Flex element='label' gap={8} align='center'>
          <RadioBox checked={isPro} onChange={() => set(plan, 'pro')} />
          <Text cursor='pointer'>Pro</Text>
        </Flex>
        <Text>Selected plan: {slot(plan)}</Text>
      </Flex>
    ),
    inherited: (
      <Flex vertical gap={16}>
        <Flex gap={16} align='center' wrap>
          <Flex gap={8} align='center'><RadioBox checked color='primary' />primary</Flex>
          <Flex gap={8} align='center'><RadioBox checked color='accent' />accent</Flex>
          <Flex gap={8} align='center'><RadioBox checked color='success' />success</Flex>
          <Flex gap={8} align='center'><RadioBox checked color='warning' />warning</Flex>
          <Flex gap={8} align='center'><RadioBox checked color='danger' />danger</Flex>
        </Flex>
        <Flex gap={16} align='center' wrap>
          <Flex gap={8} align='center'><RadioBox size='xs' />xs</Flex>
          <Flex gap={8} align='center'><RadioBox view='dashed' />dashed</Flex>
        </Flex>
      </Flex>
    ),
  }

  return (
    <MarkdownTemplate text={description} examples={examples} />
  )
}
