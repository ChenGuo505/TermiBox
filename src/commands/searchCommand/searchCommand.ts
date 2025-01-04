import type { Command } from '@/commands/command'
import { searchEngines } from '@/commands/searchCommand/searchUtils.ts'

const searchCommand: Command = {
  key: 'search',
  name: 'Search Command',
  desc: 'Search for a keyword',
  params: [
    {
      key: 'keyword',
      desc: 'Keyword',
      required: true,
    },
  ],
  options: [
    {
      key: 'engine',
      desc: 'Search engine, supported: google, baidu, bing',
      alias: ['e'],
      type: 'string',
      defaultValue: 'google',
    },
    {
      key: 'current',
      desc: 'Open in current page',
      alias: ['c'],
      type: 'boolean',
      defaultValue: false,
    },
  ],
  execute: (terminal, options) => {
    const { _, engine } = options
    if (_.length === 0) {
      terminal.outputErrorText('Please input the keyword')
      return
    }
    const command = searchEngines[engine]
    if (!command) {
      terminal.outputErrorText('Current search engine is not supported')
      return
    }
    command.execute(terminal, options)
  },
}

export default searchCommand
