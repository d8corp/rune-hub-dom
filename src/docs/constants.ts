import { Context } from '../utils'
import type { MenuItem } from './types'

export const BASE_URL = 'rundom'

export const menuContext = new Context<MenuItem[]>([])
