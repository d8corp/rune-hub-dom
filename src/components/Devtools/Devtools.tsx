import './Devtools.module.scss'

import { Show } from '../Show'
import { DevtoolsButton } from './DevtoolsButton'
import { DevtoolsPanel } from './DevtoolsPanel'
import { devtoolsStoreContext, useCreateDevtoolsStore } from './hooks'

import { Context } from '../../utils'

export function Devtools () {
  const store = useCreateDevtoolsStore()

  return (
    <Context.Provider for={devtoolsStoreContext} set={store}>
      <Show when={store.show} fallback={<DevtoolsButton />}>
        <DevtoolsPanel />
      </Show>
    </Context.Provider>
  )
}
