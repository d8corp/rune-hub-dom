import { logger } from '@cantinc/logger'
import { createServer } from 'vite'

import { getCommandConfig } from '../helpers'

export async function start (path = '.') {
  const config = await getCommandConfig(path, 'start')
  const server = await logger.start('Start development server', () => createServer(config))

  await server.listen()
  server.printUrls()
}
