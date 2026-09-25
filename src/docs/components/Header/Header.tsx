import { get, slot } from 'rune-hub'

import { Hide } from '../../../components'
import { Button, Flex, Link, MonitorIcon, MoonIcon, SunIcon } from '../../../ui'
import { isSmallMobile, theme, toggleTheme } from '../../state'
import styles from './Header.scss'

export function Header () {
  return (
    <Flex data-glow element='header' class={styles.root}>
      <Flex flex padding={[0, 24]} align='center' justify='between' class={styles.content}>
        <Flex element='a' exact href='/' gap={12} align='center' class={styles.logo}>
          Rundom
        </Flex>
        <Flex element='nav' align='center' gap={28}>
          <Hide when={slot(isSmallMobile)}>
            <Link href='/quick-start' class={styles.link}>Docs</Link>
            <Link href='/ui' class={styles.link}>UI</Link>
            <Link href='https://www.npmjs.com/package/rundom' class={styles.link}>NPM</Link>
            <Link href='https://github.com/d8corp/rundom' class={styles.link}>GitHub</Link>
          </Hide>
          <Button data-glow square class={styles.themeButton} onclick={toggleTheme}>
            {() => get(theme) === 'light dark' ? <SunIcon /> : get(theme) === 'light' ? <MoonIcon /> : <MonitorIcon />}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}
