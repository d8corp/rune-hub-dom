import { logger } from '@cantinc/logger'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { preview as previewBundle } from 'vite'

const DEFAULT_PORT = 4173

export async function preview (path = '.') {
  const appPath = resolve(path)
  const buildPath = resolve(appPath, 'build')

  if (!existsSync(buildPath)) throw Error(`Build folder not found: ${buildPath}`)

  const port = Number(process.env.PORT) || DEFAULT_PORT

  const server = await logger.start('Start preview server', () => previewBundle({
    root: appPath,
    configFile: false,
    envDir: false,
    publicDir: false,
    base: '/',
    build: { outDir: buildPath },
    preview: { port },
  }))

  server.printUrls()
}
