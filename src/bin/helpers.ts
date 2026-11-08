import { logger } from '@cantinc/logger'
import { config as readDotenv } from 'dotenv'
import { expand } from 'dotenv-expand'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { InlineConfig, Plugin } from 'vite'

import { buildTheme } from './theme'

export type CommandName = 'start' | 'build'

const DEFAULT_PORT = 3000
const DEFAULT_BUILD_FOLDER = 'build'
const DEFAULT_PUBLIC_FOLDER = 'public'
const DEFAULT_ENV_PREFIX = 'RD_'

const toPort = (value?: string) => {
  const port = Number(value)

  return Number.isInteger(port) && port > 0 && port < 65536 ? port : DEFAULT_PORT
}

const normalizeBase = (value?: string) => {
  if (!value) return '/'
  if (value === './' || value.startsWith('./') || /^[a-z][a-z\d+.-]*:\/\//i.test(value)) return value

  const base = value.startsWith('/') ? value : `/${value}`

  return base.endsWith('/') ? base : `${base}/`
}

const readEnvFile = (path: string, env: Record<string, string>) => {
  if (!existsSync(path)) return {}

  const parsed: Record<string, string> = {}
  const result = readDotenv({ path, processEnv: parsed, quiet: true })

  if (!result.parsed) return {}

  return expand({ parsed: result.parsed, processEnv: { ...env, ...parsed } }).parsed ?? {}
}

const loadEnv = (appPath: string, mode: string, skipFiles: string[] = []) => {
  const env = Object.fromEntries(
    Object.entries(process.env).filter((entry): entry is [string, string] => entry[1] !== undefined),
  )

  const skipped = new Set(skipFiles.map(file => resolve(appPath, file)))

  for (const name of ['.env', `.env.${mode}`]) {
    const values = readEnvFile(resolve(appPath, name), env)

    for (const [key, value] of Object.entries(values)) {
      if (process.env[key] === undefined) env[key] = value
    }
  }

  const visited = new Set<string>()
  let extendsFile = env.__ENV_EXTENDS

  while (extendsFile && !visited.has(extendsFile)) {
    visited.add(extendsFile)
    delete env.__ENV_EXTENDS

    const path = resolve(appPath, extendsFile)

    if (skipped.has(path)) break

    const values = readEnvFile(path, env)

    for (const [key, value] of Object.entries(values)) {
      if (env[key] === undefined) env[key] = value
    }

    extendsFile = env.__ENV_EXTENDS
  }

  delete env.__ENV_EXTENDS
  Object.assign(process.env, env)

  return env
}

const applyThemeEnv = (env: Record<string, string>, values: Record<string, string>) => {
  for (const [key, value] of Object.entries(values)) {
    env[key] = value
    process.env[key] = value
  }
}

const getThemeEnv = (appPath: string, env: Record<string, string>) => {
  applyThemeEnv(env, readEnvFile(resolve(appPath, '.env.theme'), env))
}

const buildThemeEnv = async (appPath: string, env: Record<string, string>) => {
  await logger.start('Build theme', async () => {
    const values = await buildTheme(appPath, { write: false })

    if (values) applyThemeEnv(env, values)
  })
}

const createThemePlugin = (appPath: string, mode: string): Plugin => ({
  name: 'rundom:theme',
  configureServer (server) {
    const themePath = resolve(appPath, 'theme.scss')

    if (!existsSync(themePath)) return

    server.watcher.add(themePath)

    server.watcher.on('change', async (path) => {
      if (resolve(path) !== themePath) return

      try {
        await buildThemeEnv(appPath, loadEnv(appPath, mode, ['.env.theme']))
        await server.restart()
      } catch (error) {
        logger.log(error instanceof Error ? error.message : String(error))
      }
    })
  },
})

const getMode = (appPath: string, command: CommandName) => {
  const preferred = command === 'start' ? 'start' : 'build'
  const fallback = command === 'start' ? 'development' : 'production'

  return existsSync(resolve(appPath, `.env.${preferred}`)) ? preferred : fallback
}

const getPackage = (appPath: string): { version?: string } => {
  const path = resolve(appPath, 'package.json')

  if (!existsSync(path)) return {}

  try {
    return JSON.parse(readFileSync(path, 'utf-8'))
  } catch {
    return {}
  }
}

export async function getCommandConfig (path: string, command: CommandName): Promise<InlineConfig> {
  const appPath = resolve(path)
  const mode = getMode(appPath, command)
  const hasTheme = existsSync(resolve(appPath, 'theme.scss'))
  const env = loadEnv(appPath, mode, hasTheme ? ['.env.theme'] : [])
  const pkg = getPackage(appPath)
  const publicPath = resolve(appPath, env.PUBLIC_FOLDER || DEFAULT_PUBLIC_FOLDER)
  const envPrefix = env.INNETJS_ENV_PREFIX || DEFAULT_ENV_PREFIX
  const port = toPort(env.PORT)

  if (hasTheme) await buildThemeEnv(appPath, env)
  else getThemeEnv(appPath, env)

  if (!env.RD_PACKAGE_VERSION && pkg.version) {
    env.RD_PACKAGE_VERSION = pkg.version
    process.env.RD_PACKAGE_VERSION = pkg.version
  }

  return {
    root: appPath,
    mode,
    base: normalizeBase(env.BASE_URL),
    publicDir: existsSync(publicPath) ? publicPath : false,
    envDir: appPath,
    envPrefix: [...new Set([envPrefix, 'VITE_'])],
    plugins: command === 'start' && hasTheme ? [createThemePlugin(appPath, mode)] : [],
    server: { port },
    preview: { port },
    build: {
      outDir: resolve(appPath, env.BUILD_FOLDER || DEFAULT_BUILD_FOLDER),
      emptyOutDir: true,
      sourcemap: env.SOURCEMAP === 'true',
    },
  }
}
