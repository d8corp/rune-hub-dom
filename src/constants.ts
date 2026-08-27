import type { Parent } from './types'
import { Context } from './utils'

export const parentContext = new Context<Parent>(document.body)
export const LAZY = Symbol('lazy')
