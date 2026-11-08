import { logger } from '@cantinc/logger'
import { build as buildBundle } from 'vite'

import { getCommandConfig } from '../helpers'

export async function build (path = '.') {
  const config = await getCommandConfig(path, 'build')

  await logger.start('Build production bundle', () => buildBundle(config))
}
