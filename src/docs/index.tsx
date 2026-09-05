import 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'
import './styles/external.global.scss'
import './styles/base.scss'

import { Hub } from 'rune-hub'

import { Router } from '../components'
import { rundom } from '../rundom'
import { listenCursorPosition, removeLoading, scrollToHash } from './helpers'
import { routing } from './routing'
// import { listenScrolling } from './state'

removeLoading()
scrollToHash()
listenCursorPosition()
// listenScrolling()

// @ts-expect-error: Test
const hub = window.hub = new Hub()

hub.use(() => {
  rundom(<Router routing={routing} />)
})
