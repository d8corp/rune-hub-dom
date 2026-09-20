import { Context } from '../utils'
import type { MenuItem } from './types'

export const menuContext = new Context<MenuItem[]>([])
