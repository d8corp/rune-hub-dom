import './Devtools.module.scss'

import { Delay } from '../Delay'
import { Show } from '../Show'
import { DevtoolsButton } from './components/DevtoolsButton'
import { DevtoolsPanel } from './components/DevtoolsPanel'
import { devtoolsStoreContext, useCreateDevtoolsStore } from './hooks'

import { Context } from '../../utils'

export function Devtools () {
  const store = useCreateDevtoolsStore()

  return (
    <Context.Provider for={devtoolsStoreContext} set={store}>
      <Show when={store.show} fallback={<Delay hide={200}><DevtoolsButton /></Delay>}>
        <Delay hide={200}>
          <DevtoolsPanel />
        </Delay>
      </Show>
    </Context.Provider>
  )
}
