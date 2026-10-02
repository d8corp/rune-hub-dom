import type { HighlightExamples } from '@docs/ui'
import { Slot } from 'rune-hub'

import { Button, Flex, SearchIcon } from '../../../../ui'
import { MarkdownTemplate } from '../../../templates'
import description from './ButtonPage.md'

export default function ButtonPage () {
  const loading = new Slot(() => false)
  const isLoading = new Slot(() => false)
  const isDisabled = new Slot(() => false)
  const toggle = () => isLoading.set(!isLoading.raw)
  const toggleDisabled = () => isDisabled.set(!isDisabled.raw)

  const handleSave = async () => {
    await new Promise(resolve => setTimeout(resolve, 5000))
  }

  const handleAlert = () => alert('Clicked!')

  const examples: HighlightExamples = {
    onclick: (
      <Button onclick={handleAlert}>
        Click Me
      </Button>
    ),
    onclickAsync: (
      <Button onclick={handleSave}>
        Save Changes
      </Button>
    ),
    onclickLoading: (
      <div>
        <Button loading={loading} onclick={handleSave}>
          Save Changes
        </Button>
        {() => loading.value ? ' Saving...' : ''}
      </div>
    ),
    color: (
      <Flex gap={8} wrap>
        <Button color='secondary'>Secondary</Button>
        <Button color='primary'>Primary</Button>
        <Button color='accent'>Accent</Button>
        <Button color='success'>Success</Button>
        <Button color='warning'>Warning</Button>
        <Button color='danger'>Danger</Button>
      </Flex>
    ),
    size: (
      <Flex gap={8} align='center'>
        <Button size='l'>Large</Button>
        <Button size='m'>Medium</Button>
        <Button size='s'>Small</Button>
      </Flex>
    ),
    loading: (
      <Flex gap={8} align='center'>
        <Button loading={isLoading}>
          Processing...
        </Button>
        <Button onclick={toggle}>
          Toggle Spinner
        </Button>
      </Flex>
    ),
    squareCircle: (
      <Flex gap={8} align='center'>
        <Button square>
          <SearchIcon />
        </Button>
        <Button circle color='accent'>
          Pill Button
        </Button>
        <Button circle square>
          <SearchIcon />
        </Button>
      </Flex>
    ),
    element: (
      <Flex gap={8}>
        <Button element='a' href='/quick-start' color='accent'>
          Get Started
        </Button>
        <Button element='a' href='https://github.com/d8corp/rundom'>
          GitHub
        </Button>
      </Flex>
    ),
    disabled: (
      <Flex gap={8} align='center'>
        <Button disabled={isDisabled} onclick={handleAlert}>
          Disabled Action
        </Button>
        <Button onclick={toggleDisabled}>
          Toggle Disabled
        </Button>
      </Flex>
    ),
  }

  return (
    <MarkdownTemplate text={description} examples={examples} />
  )
}
