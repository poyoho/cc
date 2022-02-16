import cac from 'cac'
import { version } from '../package.json'
import { createCCServer } from '.'
import type { UserConfig } from '.'

const cli = cac('cc')

cli
  .version(version)
  .option(
    '--api [api]',
    'serve API, available options: --api.port <port>, --api.host [host] and --api.strictPort'
  )

cli.command('run').action(run)

cli.parse()

export interface CliOptions extends UserConfig {}

async function run(options: CliOptions) {
  // TODO options load by file or options
  options.metric = [
    {
      name: 'performance',
      help: 'client load time',
      type: 'histogram',
      labelNames: ['page', 'channel'],
      buckets: [1, 2, 3, 4, 5]
    }
  ]

  const server = createCCServer(options)

  server.listen()
}
