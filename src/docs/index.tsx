import 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'
import './styles/external.global.scss'
import './styles/base.scss'

import { Hub, on } from 'rune-hub'

import { linkBaseUrlContext, Router, Try } from '../components'
import { rundom } from '../rundom'
import { Devtools } from '../ui'
import { Context } from '../utils'
import { BASE_URL } from './constants'
import { listenCursorPosition, removeLoading, scrollToHash } from './helpers'
import { ErrorPage } from './pages/ErrorPage'
import { routing } from './routing'
import { applyTheme } from './state'
// import { listenScrolling } from './state'

removeLoading()
scrollToHash()
listenCursorPosition()
// listenScrolling()

Hub.root.on('error', (slot) => {
  // eslint-disable-next-line no-console
  console.error(Error(`An error in slot: ${slot.rune.name}`, { cause: slot.err }))
})

function App () {
  on(applyTheme)

  return (
    <Try catch={ErrorPage}>
      <Context.Provider for={linkBaseUrlContext} set={`/${BASE_URL}`}>
        <Router routing={routing} />
      </Context.Provider>
    </Try>
  )
}

if (process.env.DEV) {
  rundom(<Devtools anon system />)
}

rundom(<App />)
