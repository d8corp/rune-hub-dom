import { get, set, slot } from 'rune-hub'

import { message } from '../../../../helpers'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardPreview,
  CardTitle,
  CheckBox,
  CheckIcon,
  Code,
  CopyIcon,
  Divider,
  Flex,
  Input,
  MoonIcon,
  RadioBox,
  SearchIcon,
  SuccessIcon,
  SunIcon,
  TerminalIcon,
  Text,
  TypeScriptIcon,
  Typography,
} from '../../../../ui'
import { Meta, Page, Title } from '../../../ui'
import styles from './UIPage.scss'

type UIColor = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger'
type UIView = 'filled' | 'bordered' | 'dashed' | 'ghost'
type UISize = 's' | 'm' | 'l'

const colorOptions: UIColor[] = ['primary', 'secondary', 'accent', 'success', 'warning', 'danger']
const viewOptions: UIView[] = ['filled', 'bordered', 'dashed', 'ghost']
const sizeOptions: UISize[] = ['s', 'm', 'l']

const color = (): UIColor => 'accent'
const view = (): UIView => 'filled'
const size = (): UISize => 'l'
const circle = () => false
const disabled = () => false

export default function UIPage () {
  const copyInstall = () => {
    navigator.clipboard.writeText('npm i rundom')
    message('Copied to clipboard')
  }

  return (
    <Page>
      <section class={styles.hero}>
        <div class={styles.heroInner}>
          <Flex vertical gap={12} class={styles.heroText}>
            <Typography>
              <Title title='Rundom UI'>
                Rundom UI
              </Title>
              <p class={styles.lead}>
                A component kit built into Rundom.
                Reactive props, surface is themeable, and updates touch only the DOM that changed.
              </p>
            </Typography>
            <Flex gap={12} wrap class={styles.heroButtons}>
              <Button element='a' href='/ui/introduction' size='l' view='filled' color='accent'>
                Start building
              </Button>
              <Button element='a' href='/ui/overview' size='l' view='bordered'>
                Browse components
              </Button>
            </Flex>
            <Flex gap={18} wrap class={styles.meta}>
              <Meta><SuccessIcon />Signal-first</Meta>
              <Meta><SunIcon />Your theme tokens</Meta>
              <Meta><TypeScriptIcon />TypeScript</Meta>
            </Flex>
          </Flex>
          <div class={styles.stage}>
            <div class={styles.stageHalo} aria-hidden='true' />
            <div class={`${styles.floatChip} ${styles.floatChipTop}`}>
              <SuccessIcon size={14} />
              <span>Signal updated</span>
            </div>
            <div class={`${styles.floatChip} ${styles.floatChipBottom}`}>
              <TerminalIcon size={14} />
              <span>0 VDOM</span>
            </div>
            <Card size='l' class={styles.window}>
              <div class={styles.windowBar}>
                <Flex gap={6} align='center'>
                  <Box color='danger' circle size='xs' />
                  <Box color='warning' circle size='xs' />
                  <Box color='success' circle size='xs' />
                </Flex>
                <Text size={11} weight='600' color='var(--rd__root_color-dim)' class={styles.windowName}>ui-kit.tsx</Text>
                <MoonIcon size={13} />
              </div>
              <div class={styles.windowBody}>
                <Flex justify='space-between' align='center' gap={12}>
                  <div>
                    <span class={styles.windowKicker}>Playground</span>
                    <div class={styles.windowTitle}>New project</div>
                  </div>
                  <Button size='s' view='filled' color='accent'>
                    Create
                  </Button>
                </Flex>
                <Input size='s' placeholder='Project name' before={<SearchIcon />} />
                <Flex gap={16} wrap>
                  <Flex align='center' gap={6}>
                    <CheckBox checked />
                    <Text size={11}>Reactive</Text>
                  </Flex>
                  <Flex align='center' gap={6}>
                    <RadioBox checked />
                    <Text size={11}>Themed</Text>
                  </Flex>
                  <Flex align='center' gap={6}>
                    <CheckBox checked={null} />
                    <Text size={11}>Async</Text>
                  </Flex>
                </Flex>
                <Divider />
                <Flex justify='space-between' align='center'>
                  <Flex gap={6}>
                    <Button size='s' square view='bordered' aria-label='Search'>
                      <SearchIcon size={13} />
                    </Button>
                    <Button size='s' square view='bordered' aria-label='Light theme'>
                      <SunIcon size={13} />
                    </Button>
                    <Button size='s' square view='bordered' aria-label='Dark theme'>
                      <MoonIcon size={13} />
                    </Button>
                  </Flex>
                  <Text size={10} weight='600' color='var(--rd__root_color-dim)'>NO VDOM</Text>
                </Flex>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section class={styles.stats}>
        <div class={styles.statsInner}>
          <div class={styles.stat}>
            <span class={styles.statValue}>20+</span>
            <span class={styles.statLabel}>Components</span>
          </div>
          <div class={styles.stat}>
            <span class={styles.statValue}>17</span>
            <span class={styles.statLabel}>Icons</span>
          </div>
          <div class={styles.stat}>
            <span class={styles.statValue}>1</span>
            <span class={styles.statLabel}>Widget</span>
          </div>
          <div class={styles.stat}>
            <span class={styles.statValue}>1</span>
            <span class={styles.statLabel}>Theme</span>
          </div>
        </div>
      </section>

      <section id='components' class={styles.section}>
        <div class={`${styles.sectionHead} ${styles.reveal}`}>
          <span class={styles.kicker}>Component atlas</span>
          <h2 class={styles.sectionTitle}>Small pieces. Serious range.</h2>
          <p class={styles.sectionLead}>
            Compose full interfaces from focused building blocks. Every component follows the same reactive model and shares the same design tokens.
          </p>
        </div>
        <div class={styles.atlas}>
          <Card
            element='a'
            href='/ui/button'
            size='l'
            hoverable
            class={`${styles.atlasCard} ${styles.atlasControls}`}
          >
            <CardPreview class={styles.atlasPreview}>
              <Flex vertical gap={10} class={styles.previewStack}>
                <Flex gap={6} wrap>
                  <Button size='s' view='filled' color='accent'>Create</Button>
                  <Button size='s' view='bordered'>Cancel</Button>
                </Flex>
                <Flex gap={8} align='center'>
                  <Input flex size='s' placeholder='Search' before={<SearchIcon />} />
                  <CheckBox checked />
                  <RadioBox checked />
                </Flex>
              </Flex>
            </CardPreview>
            <CardContent vertical class={styles.atlasInfo}>
              <CardTitle class={styles.atlasTitle} justify='space-between' align='center'>
                Controls
                <span class={styles.atlasArrow}>↗</span>
              </CardTitle>
              <CardDescription class={styles.atlasText}>
                Buttons, inputs, and choices that respond instantly to user intent.
              </CardDescription>
              <div class={styles.atlasTags}>
                <span class={styles.atlasTag}>Button</span>
                <span class={styles.atlasTag}>Input</span>
                <span class={styles.atlasTag}>CheckBox</span>
                <span class={styles.atlasTag}>RadioBox</span>
              </div>
            </CardContent>
          </Card>

          <Card
            element='a'
            href='/ui/flex'
            size='l'
            hoverable
            class={`${styles.atlasCard} ${styles.atlasLayout}`}
          >
            <CardPreview class={styles.atlasPreview}>
              <Flex gap={8} class={styles.layoutPreview}>
                <Flex vertical gap={8} flex>
                  <div class={styles.layoutBar} />
                  <div class={styles.layoutBar} />
                  <div class={styles.layoutBar} />
                </Flex>
                <div class={styles.layoutPanel} />
              </Flex>
            </CardPreview>
            <CardContent vertical class={styles.atlasInfo}>
              <CardTitle class={styles.atlasTitle} justify='space-between' align='center'>
                Layout
                <span class={styles.atlasArrow}>↗</span>
              </CardTitle>
              <CardDescription class={styles.atlasText}>
                Flexible primitives for arranging content without fighting the browser.
              </CardDescription>
              <div class={styles.atlasTags}>
                <span class={styles.atlasTag}>Flex</span>
                <span class={styles.atlasTag}>Box</span>
                <span class={styles.atlasTag}>Divider</span>
              </div>
            </CardContent>
          </Card>

          <Card
            element='a'
            href='/ui/typography'
            size='l'
            hoverable
            class={`${styles.atlasCard} ${styles.atlasTypography}`}
          >
            <CardPreview class={styles.atlasPreview}>
              <Typography class={styles.typePreview}>
                <h3>Type that reads</h3>
                <p>A quiet rhythm for loud ideas.</p>
              </Typography>
            </CardPreview>
            <CardContent vertical class={styles.atlasInfo}>
              <CardTitle class={styles.atlasTitle} justify='space-between' align='center'>
                Typography
                <span class={styles.atlasArrow}>↗</span>
              </CardTitle>
              <CardDescription class={styles.atlasText}>
                Headings, paragraphs, and rich content with consistent spacing.
              </CardDescription>
              <div class={styles.atlasTags}>
                <span class={styles.atlasTag}>Typography</span>
                <span class={styles.atlasTag}>Text</span>
                <span class={styles.atlasTag}>Markdown</span>
              </div>
            </CardContent>
          </Card>

          <Card
            element='a'
            href='/ui/icons'
            size='l'
            hoverable
            class={`${styles.atlasCard} ${styles.atlasIcons}`}
          >
            <CardPreview class={styles.atlasPreview}>
              <Flex gap={10} wrap justify='center' class={styles.iconRow}>
                <span class={styles.iconTile}><SearchIcon size={20} /></span>
                <span class={styles.iconTile}><SunIcon size={20} /></span>
                <span class={styles.iconTile}><MoonIcon size={20} /></span>
                <span class={styles.iconTile}><CopyIcon size={20} /></span>
                <span class={styles.iconTile}><CheckIcon size={20} /></span>
                <span class={styles.iconTile}><TerminalIcon size={20} /></span>
              </Flex>
            </CardPreview>
            <CardContent vertical class={styles.atlasInfo}>
              <CardTitle class={styles.atlasTitle} justify='space-between' align='center'>
                Icons
                <span class={styles.atlasArrow}>↗</span>
              </CardTitle>
              <CardDescription class={styles.atlasText}>
                A compact stroke set that inherits color and scales with your text.
              </CardDescription>
              <div class={styles.atlasTags}>
                <span class={styles.atlasTag}>17 icons</span>
                <span class={styles.atlasTag}>BaseIcon</span>
                <span class={styles.atlasTag}>Reactive size</span>
              </div>
            </CardContent>
          </Card>

          <Card
            element='a'
            href='/ui/box'
            size='l'
            hoverable
            class={`${styles.atlasCard} ${styles.atlasSurfaces}`}
          >
            <CardPreview class={styles.atlasPreview}>
              <Flex gap={10} align='center'>
                <Box view='filled' color='accent' size='xl' circle>
                  <SunIcon size={20} />
                </Box>
                <Box view='bordered' color='primary' size='xl' circle>
                  <MoonIcon size={20} />
                </Box>
                <Box view='dashed' color='success' size='xl' circle>
                  <SearchIcon size={20} />
                </Box>
                <Box view='ghost' color='warning' size='xl' circle>
                  <TerminalIcon size={20} />
                </Box>
              </Flex>
            </CardPreview>
            <CardContent vertical class={styles.atlasInfo}>
              <CardTitle class={styles.atlasTitle} justify='space-between' align='center'>
                Surfaces
                <span class={styles.atlasArrow}>↗</span>
              </CardTitle>
              <CardDescription class={styles.atlasText}>
                Color, borders, and depth drawn from one set of theme tokens.
              </CardDescription>
              <div class={styles.atlasTags}>
                <span class={styles.atlasTag}>Box</span>
                <span class={styles.atlasTag}>Card</span>
                <span class={styles.atlasTag}>Theme</span>
              </div>
            </CardContent>
          </Card>

          <Card
            element='a'
            href='/ui/markdown'
            size='l'
            hoverable
            class={`${styles.atlasCard} ${styles.atlasContent}`}
          >
            <CardPreview class={styles.atlasPreview}>
              <Flex vertical gap={10} align='flex-start' class={styles.contentPreview}>
                <Code>npm i rundom</Code>
                <Typography>
                  <p><strong>Reactive</strong> content with <em>Markdown</em>.</p>
                </Typography>
              </Flex>
            </CardPreview>
            <CardContent vertical class={styles.atlasInfo}>
              <CardTitle class={styles.atlasTitle} justify='space-between' align='center'>
                Content
                <span class={styles.atlasArrow}>↗</span>
              </CardTitle>
              <CardDescription class={styles.atlasText}>
                Code, Markdown, and inline details for documentation-grade UI.
              </CardDescription>
              <div class={styles.atlasTags}>
                <span class={styles.atlasTag}>Code</span>
                <span class={styles.atlasTag}>Markdown</span>
                <span class={styles.atlasTag}>Link</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section class={styles.liveSection}>
        <div class={styles.liveInner}>
          <div class={`${styles.liveCopy} ${styles.reveal}`}>
            <span class={styles.kicker}>Live playground</span>
            <h2 class={styles.sectionTitle}>Every prop is a signal.</h2>
            <p class={styles.sectionLead}>
              Change a control and watch the preview update at the source. No virtual DOM, no re-render pass — just the node that changed.
            </p>
            <Flex vertical gap={12} class={styles.checkList}>
              <span class={styles.checkItem}>
                <span class={styles.checkIcon}><CheckIcon size={11} /></span>
                Reactive props, zero wiring
              </span>
              <span class={styles.checkItem}>
                <span class={styles.checkIcon}><CheckIcon size={11} /></span>
                Themes switch with CSS variables
              </span>
              <span class={styles.checkItem}>
                <span class={styles.checkIcon}><CheckIcon size={11} /></span>
                Keyboard and focus states included
              </span>
            </Flex>
          </div>

          <Card size='l' class={styles.playground}>
            <Flex justify='space-between' align='center' class={styles.playgroundHead}>
              <Flex align='center' gap={8}>
                <Box color='success' size='xxs' circle data-live />
                <Text size={10} weight='700' color='var(--rd__root_color-dim)'>LIVE PREVIEW</Text>
              </Flex>
              <Text size={10} weight='600' color='var(--rd__root_color-dim)'>@rundom/ui</Text>
            </Flex>

            <Flex align='center' justify='center' class={styles.previewCanvas}>
              <div class={styles.previewHalo} aria-hidden='true' />
              <div class={styles.previewButton}>
                <Button
                  color={slot(color)}
                  view={slot(view)}
                  size={slot(size)}
                  circle={slot(circle)}
                  disabled={slot(disabled)}
                  onclick={() => message('Hello from Rundom UI')}
                >
                  Build something
                </Button>
              </div>
            </Flex>

            <div class={styles.codeStrip}>
              <Code class={styles.configCode}>
                {() => `<Button color="${get(color)}" view="${get(view)}" size="${get(size)}"${get(circle) ? ' circle' : ''}${get(disabled) ? ' disabled' : ''} />`}
              </Code>
            </div>

            <Flex vertical gap={12} class={styles.controls}>
              <div class={styles.controlRow}>
                <Text size={10} weight='700' color='var(--rd__root_color-dim)' class={styles.controlLabel}>COLOR</Text>
                <Flex gap={6} wrap flex>
                  {colorOptions.map(option => (
                    <Button
                      size='s'
                      color={option}
                      view={() => get(color) === option ? 'filled' : 'bordered'}
                      onclick={() => set(color, option)}
                    >
                      {option}
                    </Button>
                  ))}
                </Flex>
              </div>
              <div class={styles.controlRow}>
                <Text size={10} weight='700' color='var(--rd__root_color-dim)' class={styles.controlLabel}>VIEW</Text>
                <Flex gap={6} wrap flex>
                  {viewOptions.map(option => (
                    <Button
                      size='s'
                      color={() => get(view) === option ? 'primary' : 'secondary'}
                      view={() => get(view) === option ? 'filled' : 'bordered'}
                      onclick={() => set(view, option)}
                    >
                      {option}
                    </Button>
                  ))}
                </Flex>
              </div>
              <div class={styles.controlRow}>
                <Text size={10} weight='700' color='var(--rd__root_color-dim)' class={styles.controlLabel}>SIZE</Text>
                <Flex gap={6} wrap flex>
                  {sizeOptions.map(option => (
                    <Button
                      size='s'
                      color={() => get(size) === option ? 'primary' : 'secondary'}
                      view={() => get(size) === option ? 'filled' : 'bordered'}
                      onclick={() => set(size, option)}
                    >
                      {option.toUpperCase()}
                    </Button>
                  ))}
                </Flex>
              </div>
              <Flex gap={18} wrap align='center' class={styles.toggles}>
                <Flex element='label' align='center' gap={6}>
                  <CheckBox checked={slot(circle)} />
                  <Text size={12}>Circle</Text>
                </Flex>
                <Flex element='label' align='center' gap={6}>
                  <CheckBox checked={slot(disabled)} />
                  <Text size={12}>Disabled</Text>
                </Flex>
              </Flex>
            </Flex>
          </Card>
        </div>
      </section>

      <section class={styles.ctaSection}>
        <Card size='l' class={styles.cta}>
          <div class={styles.ctaGlow} aria-hidden='true' />
          <span class={styles.kicker}>Ready when you are</span>
          <h2 class={styles.ctaTitle}>Build the next screen with Rundom UI.</h2>
          <p class={styles.ctaText}>
            Start with the introduction, then jump into the component reference or copy the install command and go.
          </p>
          <Flex gap={12} wrap justify='center' class={styles.ctaActions}>
            <Button element='a' href='/ui/introduction' size='l' view='filled' color='accent'>
              Get Started
            </Button>
            <Button element='a' href='/ui/icons' size='l' view='bordered'>
              Explore icons
            </Button>
          </Flex>
          <Flex align='center' gap={6} class={styles.install}>
            <Code class={styles.installCode}>npm init rundom</Code>
            <Button
              size='s'
              square
              circle
              view='ghost'
              title='Copy install command'
              aria-label='Copy install command'
              onclick={copyInstall}
            >
              <CopyIcon size={14} />
            </Button>
          </Flex>
        </Card>
      </section>
    </Page>
  )
}
