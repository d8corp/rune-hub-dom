import { classes } from 'html-classes'
import { Slot } from 'rune-hub'

import { Hide } from '../../../components'
import { useShow } from '../../../hooks'
import { MonitorIcon, MoonIcon, SunIcon } from '../../icons'
import { pageWidth, theme, toggleTheme } from '../../state'
import { Button, Flex, Link } from '../../ui'
import styles from './Header.scss'

export function Header () {
  const show = useShow(200)

  const hideMenu = new Slot(() => pageWidth.value < 420)

  return (
    <Flex element='header' class={() => classes([styles.root, show.value && styles.show])}>
      <Flex flex padding={[0, 24]} align='center' justify='between' class={styles.content}>
        <Flex element='a' exact href='/' gap={12} align='center' class={styles.logo}>
          Rundom
        </Flex>
        <Flex element='nav' align='center' gap={28}>
          <Hide when={hideMenu}>
            <Link href='/quick-start' class={styles.link}>Docs</Link>
            <Link href='https://www.npmjs.com/package/rundom' class={styles.link}>NPM</Link>
            <Link href='https://github.com/d8corp/rundom' class={styles.link}>GitHub</Link>
          </Hide>
          <Button view='glow' class={styles.themeButton} onclick={toggleTheme}>
            {() => theme.value === 'light dark' ? <SunIcon /> : theme.value === 'light' ? <MoonIcon /> : <MonitorIcon />}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}
