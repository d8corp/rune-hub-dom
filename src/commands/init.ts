import { logger } from '@cantinc/logger'
import chalk from 'chalk'
import selector from 'cli-select'
import spawn from 'cross-spawn'
import { writeFile } from 'fs/promises'
import { existsSync, mkdirSync, rmSync } from 'node:fs'
import { basename, resolve } from 'node:path'
import readline from 'readline'

const basePkg = {
  private: true,
  dependencies: {
    rundom: `^${import.meta.env.INNETJS__PACKAGE_VERSION}`,
  },
}

const indexScript = `import { rundom } from 'rundom'

rundom('Hello World!')
`

const indexHTML = `<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="apple-mobile-web-app-title" content="Rundom" />
    <title>Rundom</title>
    <script type="module" defer src="src/index.ts"></script>
</head>
<body>
</body>
</html>
`

export async function init (path = '.') {
  const appPath = resolve(path)
  const pkgPath = resolve(appPath, 'package.json')
  const htmlPath = resolve(appPath, 'index.html')
  const srcPath = resolve(appPath, 'src')
  const indexPath = resolve(srcPath, 'index.ts')
  const name = basename(appPath)

  await logger.start('Check the target folder is exist', async () => {
    if (existsSync(appPath)) {
      logger.log(chalk.red(`'${appPath}' already exist, what do you want?`))

      const { id, value } = await selector({
        values: ['Stop the process', 'Remove the folder', 'Merge with it'],
      })

      readline.moveCursor(process.stdout, 0, -1)

      logger.log(`Already exist, selected: ${value}`)

      if (!id) {
        throw Error(`'${appPath}' already exist`)
      }

      if (id === 1) {
        rmSync(appPath, { recursive: true, force: true })
      }
    }
  })

  await logger.start('Add project structure', async () => {
    mkdirSync(srcPath, { recursive: true })

    await Promise.all([
      writeFile(pkgPath, JSON.stringify({ name, ...basePkg }, null, 2) + '\n'),
      writeFile(indexPath, indexScript),
      writeFile(htmlPath, indexHTML),
    ])
  })

  await logger.start('Install dependencies', async () => {
    const result = spawn.sync('npm', ['install'], { cwd: appPath })

    if (result.error) {
      throw Error(`Failed to run npm: ${result.error.message}`)
    }

    if (result.status !== 0) {
      const output = result.stderr?.toString() || result.stdout?.toString()
      throw Error(`npm install failed:\n${output}`)
    }
  })
}
