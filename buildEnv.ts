/* eslint-disable no-console */
import { buildTheme } from './src/bin/theme'

buildTheme('.', { write: true }).catch(console.error)
