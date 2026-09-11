import './Devtools.module.scss'

import { Hub } from 'rune-hub'

import { Delay } from '../Delay'
import { HubProvider } from '../HubProvider'
import { Show } from '../Show'
import { DevtoolsButton } from './components/DevtoolsButton'
import { DevtoolsPanel } from './components/DevtoolsPanel'
import { devtoolsStoreContext, useCreateDevtoolsStore } from './hooks'

import { Context } from '../../utils'

export interface DevtoolsProps {
  anon?: boolean
  system?: boolean
}

export function Devtools (props: DevtoolsProps) {
  const hub = new Hub()
  const store = useCreateDevtoolsStore(props, hub)

  return (
    <HubProvider hub={hub}>
      <Context.Provider for={devtoolsStoreContext} set={store}>
        <Show when={store.show} fallback={<DevtoolsButton />}>
          <Delay hide={200}>
            <DevtoolsPanel />
          </Delay>
        </Show>
      </Context.Provider>
    </HubProvider>
  )
}
