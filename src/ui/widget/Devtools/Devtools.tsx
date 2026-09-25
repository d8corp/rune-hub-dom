import { Hub } from 'rune-hub'

import { DevtoolsPanel } from './components/DevtoolsPanel'
import { devtoolsStoreContext, useCreateDevtoolsStore } from './hooks'

import { Delay } from '../../../components/Delay'
import { HubProvider } from '../../../components/HubProvider'
import { Show } from '../../../components/Show'
import type { StyledProps } from '../../../hooks'
import { useStyles } from '../../../hooks'
import { addCSS, Context, viewTransition } from '../../../utils'
import { Button } from '../../block'

if (import.meta.env?.RD_THEME_DEVTOOLS) {
  addCSS(import.meta.env.RD_THEME_DEVTOOLS, 'devtools')
}

export const devtoolsStyles = {
  root: import.meta.env?.RD_THEME_DEVTOOLS__ROOT,
}

export type DevtoolsStyles = typeof devtoolsStyles

export interface DevtoolsProps extends StyledProps<DevtoolsStyles> {
  anon?: boolean
  system?: boolean
}

export function Devtools (props: DevtoolsProps) {
  const hub = new Hub()
  const styles = useStyles(devtoolsStyles, props.class)
  const store = useCreateDevtoolsStore(props, hub)

  const show = () => {
    viewTransition(() => {
      store.show.set(true)
    })
  }

  const button = (
    <Button
      color='accent'
      onclick={show}
      class={styles.root}
    >
      Devtools
    </Button>
  )

  return (
    <HubProvider hub={hub}>
      <Context.Provider for={devtoolsStoreContext} set={store}>
        <Show when={store.show} fallback={button}>
          <Delay hide={200}>
            <DevtoolsPanel />
          </Delay>
        </Show>
      </Context.Provider>
    </HubProvider>
  )
}
