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

import { Router, Try } from '../components'
import { useUpdateHistory } from '../hooks'
import { rundom } from '../rundom'
import { Devtools } from '../ui'
import { addCSS } from '../utils'
import { listenCursorPosition, removeLoading, scrollToHash } from './helpers'
import { ErrorPage } from './pages/system/ErrorPage'
import { routing } from './routing'
import { applyThemeEffect } from './state'
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
  useUpdateHistory()
  on(applyThemeEffect)

  return (
    <Try catch={ErrorPage}>
      <Router routing={routing} />
    </Try>
  )
}

if (import.meta.env?.RD_THEME__ROOT) {
  addCSS(import.meta.env.RD_THEME__ROOT, 'root')
}

if (import.meta.env?.DEV) {
  rundom(<Devtools anon system />)
}

rundom(<App />)
