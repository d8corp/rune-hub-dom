#!/usr/bin/env node
import { program } from 'commander'

import { build, init, preview, start } from './commands'

program
  .name('rundom')
  .description('CLI that builds and runs rundom apps')
  .version(import.meta.env.RD_PACKAGE_VERSION, '-v, --version')

program
  .command('init [app-path]')
  .description('create an app folder with rundom project template')
  .action(init)

program
  .command('start [app-path]')
  .description('build the app and run it, restarting when a project file has changed')
  .action(start)

program
  .command('build [app-path]')
  .description('build the app for production')
  .action(build)

program
  .command('preview [app-path]')
  .description('starts a local static web server for your build app')
  .action(preview)

try {
  await program.parseAsync()
} catch {
  process.exitCode = 1
}
