import { Hub } from 'rune-hub'

import { DevtoolsButton } from './components/DevtoolsButton'
import { DevtoolsPanel } from './components/DevtoolsPanel'
import { devtoolsStoreContext, useCreateDevtoolsStore } from './hooks'

import { Delay } from '../../../components/Delay'
import { HubProvider } from '../../../components/HubProvider'
import { Show } from '../../../components/Show'
import { Context } from '../../../utils'

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
        <Show when={store.show} fallback={<Delay hide={200}><DevtoolsButton /></Delay>}>
          <Delay hide={200}>
            <DevtoolsPanel />
          </Delay>
        </Show>
      </Context.Provider>
    </HubProvider>
  )
}
