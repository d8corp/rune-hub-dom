import type { HighlightExamples } from '@docs/ui'
import { get, set, Slot, slot } from 'rune-hub'

import { message } from '../../../../helpers'
import { Button, CheckBox, Flex, Text } from '../../../../ui'
import { MarkdownTemplate } from '../../../templates'
import description from './CheckBoxPage.md'

export default function CheckBoxPage () {
  const checkedSlot = new Slot<boolean | null>(() => true)
  const volume = () => 50
  const muted = () => get(volume) === 0

  const toggleMute = (checked: boolean) => set(volume, checked ? 0 : 50)

  const selectAll = new Slot<boolean | null>(() => false)
  const option1 = new Slot(() => false)
  const option2 = new Slot(() => false)
  const option3 = new Slot(() => false)

  const handleSelectAll = (checked: boolean) => {
    selectAll.set(checked)
    option1.set(checked)
    option2.set(checked)
    option3.set(checked)
  }

  const updateSelectAll = () => {
    const values = [option1.value, option2.value, option3.value]
    const allChecked = values.every(v => v)
    const noneChecked = values.every(v => !v)

    selectAll.set(allChecked || noneChecked ? allChecked : null)
  }

  const examples: HighlightExamples = {
    basic: (
      <Flex gap={8} wrap align='center'>
        <CheckBox />
        <CheckBox checked />
      </Flex>
    ),
    label: (
      <Flex gap={8} wrap align='center'>
        <Flex element='label' gap={8} align='center'>
          <CheckBox />
          <Text cursor='pointer'>
            Unchecked
          </Text>
        </Flex>
        <Flex element='label' gap={8} align='center'>
          <CheckBox checked />
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
          message(`offer: ${data.get('offer') ?? 'no'}, subscribe: ${data.get('subscribe') ?? 'no'}`)
        }}
      >
        <Flex element='label' gap={8} align='center'>
          <CheckBox name='offer' value='accepted' />
          <Text cursor='pointer'>I accept the terms of the offer</Text>
        </Flex>
        <Flex element='label' gap={8} align='center'>
          <CheckBox checked name='subscribe' value='yes' />
          <Text cursor='pointer'>Subscribe to the newsletter</Text>
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
          <CheckBox checked={checkedSlot} />
          <Text cursor='pointer'>
            Dynamic checkbox
          </Text>
        </Flex>
        <Flex gap={8}>
          <Button onclick={() => checkedSlot.set(true)}>True</Button>
          <Button onclick={() => checkedSlot.set(null)}>Null</Button>
          <Button onclick={() => checkedSlot.set(false)}>False</Button>
        </Flex>
        <div>Current state: {() => String(checkedSlot.value)}</div>
      </Flex>
    ),
    disabled: (
      <Flex vertical gap={8}>
        <Flex gap={8} align='center'>
          <CheckBox disabled />
          Disabled
        </Flex>
        <Flex gap={8} align='center'>
          <CheckBox checked disabled />
          Disabled and checked
        </Flex>
        <Flex gap={8} align='center'>
          <CheckBox checked={null} disabled />
          Disabled and indeterminate
        </Flex>
      </Flex>
    ),
    onChange: (
      <Flex vertical gap={8}>
        <Flex element='label' gap={8} align='center'>
          <CheckBox checked={slot(muted)} onChange={toggleMute} />
          <Text cursor='pointer'>Mute sound</Text>
        </Flex>
        <Text>Volume: {slot(volume)}%</Text>
      </Flex>
    ),
    selectAll: (
      <Flex vertical gap={8}>
        <Flex element='label' gap={8} align='center'>
          <CheckBox checked={selectAll} onChange={handleSelectAll} />
          <Text cursor='pointer' weight='bold'>Select All</Text>
        </Flex>
        <Flex vertical gap={4} style={{ 'margin-left': '24px' }}>
          <Flex element='label' gap={8} align='center'>
            <CheckBox checked={option1} onChange={updateSelectAll} />
            <Text cursor='pointer'>Option 1</Text>
          </Flex>
          <Flex element='label' gap={8} align='center'>
            <CheckBox checked={option2} onChange={updateSelectAll} />
            <Text cursor='pointer'>Option 2</Text>
          </Flex>
          <Flex element='label' gap={8} align='center'>
            <CheckBox checked={option3} onChange={updateSelectAll} />
            <Text cursor='pointer'>Option 3</Text>
          </Flex>
        </Flex>
      </Flex>
    ),
    inherited: (
      <Flex vertical gap={16}>
        <Flex gap={16} align='center' wrap>
          <Flex gap={8} align='center'><CheckBox checked color='primary' />primary</Flex>
          <Flex gap={8} align='center'><CheckBox checked color='accent' />accent</Flex>
          <Flex gap={8} align='center'><CheckBox checked color='success' />success</Flex>
          <Flex gap={8} align='center'><CheckBox checked color='warning' />warning</Flex>
          <Flex gap={8} align='center'><CheckBox checked color='danger' />danger</Flex>
        </Flex>
        <Flex gap={16} align='center' wrap>
          <Flex gap={8} align='center'><CheckBox size='xs' />xs</Flex>
          <Flex gap={8} align='center'><CheckBox view='dashed' />dashed</Flex>
        </Flex>
      </Flex>
    ),
  }

  return (
    <MarkdownTemplate text={description} examples={examples} />
  )
}
