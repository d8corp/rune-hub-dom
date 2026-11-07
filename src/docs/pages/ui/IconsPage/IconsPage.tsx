import { Slot } from 'rune-hub'

import { For, Show } from '../../../../components'
import { message } from '../../../../helpers'
import type { JSXElement } from '../../../../types'
import {
  AsideIcon,
  BurgerIcon,
  Card,
  CardDescription,
  CardContent,
  CardPreview,
  CardTitle,
  CheckIcon,
  CloseIcon,
  CopyIcon,
  Flex,
  HtmlIcon,
  Input,
  JsonIcon,
  LinkIcon,
  MonitorIcon,
  MoonIcon,
  SearchIcon,
  SideIcon,
  SuccessIcon,
  SunIcon,
  TerminalIcon,
  TypeScriptIcon,
  Typography,
} from '../../../../ui'
import { Page, Title } from '../../../ui'
import styles from './IconsPage.scss'

interface IconItem {
  name: string
  description: string
  keywords: string
  icon: JSXElement
}

interface IconGroup {
  title: string
  items: IconItem[]
}

export default function IconsPage () {
  const search = new Slot(() => '')

  const groups: IconGroup[] = [
    {
      title: 'Navigation',
      items: [
        {
          name: 'AsideIcon',
          description: 'Aside panel with a marker on the right.',
          keywords: 'aside sidebar panel layout',
          icon: <AsideIcon size={32} />,
        },
        {
          name: 'SideIcon',
          description: 'Side panel with a marker on the left.',
          keywords: 'side sidebar panel layout',
          icon: <SideIcon size={32} />,
        },
        {
          name: 'BurgerIcon',
          description: 'Menu toggle with three horizontal lines.',
          keywords: 'burger menu navigation toggle',
          icon: <BurgerIcon size={32} />,
        },
        {
          name: 'CloseIcon',
          description: 'Dismisses a dialog or removes an item.',
          keywords: 'close cancel dismiss cross',
          icon: <CloseIcon size={32} />,
        },
        {
          name: 'LinkIcon',
          description: 'Represents a link or navigation.',
          keywords: 'link chain url navigation',
          icon: <LinkIcon size={32} />,
        },
        {
          name: 'SearchIcon',
          description: 'Magnifying glass for search inputs.',
          keywords: 'search find magnifier',
          icon: <SearchIcon size={32} />,
        },
      ],
    },
    {
      title: 'Status',
      items: [
        {
          name: 'CheckIcon',
          description: 'A simple checkmark.',
          keywords: 'check done confirm',
          icon: <CheckIcon size={32} />,
        },
        {
          name: 'SuccessIcon',
          description: 'Confirms a successful operation.',
          keywords: 'success done complete',
          icon: <SuccessIcon size={32} />,
        },
        {
          name: 'CopyIcon',
          description: 'Copies content to the clipboard.',
          keywords: 'copy duplicate clipboard',
          icon: <CopyIcon size={32} />,
        },
      ],
    },
    {
      title: 'Theme',
      items: [
        {
          name: 'SunIcon',
          description: 'Light theme.',
          keywords: 'sun light theme day',
          icon: <SunIcon size={32} />,
        },
        {
          name: 'MoonIcon',
          description: 'Dark theme.',
          keywords: 'moon dark theme night',
          icon: <MoonIcon size={32} />,
        },
        {
          name: 'MonitorIcon',
          description: 'Desktop display or system theme.',
          keywords: 'monitor screen desktop display system theme',
          icon: <MonitorIcon size={32} />,
        },
      ],
    },
    {
      title: 'Files',
      items: [
        {
          name: 'HtmlIcon',
          description: 'HTML file or markup.',
          keywords: 'html file markup code',
          icon: <HtmlIcon size={32} />,
        },
        {
          name: 'JsonIcon',
          description: 'JSON data file.',
          keywords: 'json data file code',
          icon: <JsonIcon size={32} />,
        },
        {
          name: 'TypeScriptIcon',
          description: 'TypeScript file or type-safe code.',
          keywords: 'typescript ts file code',
          icon: <TypeScriptIcon size={32} />,
        },
        {
          name: 'TerminalIcon',
          description: 'Command line or shell output.',
          keywords: 'terminal console shell command',
          icon: <TerminalIcon size={32} />,
        },
      ],
    },
  ]

  const filteredGroups = new Slot(function filteredGroups () {
    const query = search.value.trim().toLowerCase()

    if (!query) return groups

    return groups.reduce<IconGroup[]>((result, group) => {
      const items = group.items.filter(item => {
        return `${item.name} ${item.description} ${item.keywords}`.toLowerCase().includes(query)
      })

      if (items.length) {
        result.push({ ...group, items })
      }

      return result
    }, [])
  })

  const isEmpty = new Slot(() => !filteredGroups.value.length)

  const copy = (name: string) => () => {
    navigator.clipboard.writeText(`<${name} />`)
    message('Copied to clipboard')
  }

  return (
    <Page>
      <Typography>
        <Title title='Icons'>Icons</Title>
        <p>
          A set of stroke icons that inherit the current text color. Click any icon to copy its component.
        </p>
      </Typography>
      <Flex vertical>
        <div class={styles.search}>
          <Input
            size='l'
            circle
            clearable
            debounce
            value={search}
            placeholder='Search icons'
            before={<SearchIcon />}
          />
        </div>
        <For of={filteredGroups} key='title'>
          {group => (
            <section class={styles.section}>
              <h2 class={styles.groupTitle}>
                {() => group.value.title}
              </h2>
              <div class={styles.grid}>
                <For of={() => group.value.items} key='name'>
                  {item => (
                    <Card
                      element='button'
                      type='button'
                      size='s'
                      interactive
                      aria-label={`Copy <${item.value.name} />`}
                      onclick={copy(item.value.name)}
                    >
                      <CardPreview class={styles.preview}>
                        {() => item.value.icon}
                      </CardPreview>
                      <CardContent class={styles.info}>
                        <CardTitle class={styles.name}>{() => item.value.name}</CardTitle>
                        <CardDescription>{() => item.value.description}</CardDescription>
                      </CardContent>
                    </Card>
                  )}
                </For>
              </div>
            </section>
          )}
        </For>
        <Show when={isEmpty}>
          <div class={styles.empty}>No icons found</div>
        </Show>
      </Flex>
    </Page>
  )
}
