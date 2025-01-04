import type { Command } from '@/commands/command'

const bingCommand: Command = {
  key: 'bing',
  name: 'bing Command',
  desc: 'Search on bing',
  params: [
    {
      key: 'keyword',
      desc: 'Keyword',
      required: true,
    },
  ],
  options: [
    {
      key: 'current',
      desc: 'Open in current page',
      alias: ['c'],
      type: 'boolean',
      defaultValue: false,
    },
  ],
  execute: (terminal, options) => {
    const { _, current } = options
    if (_.length === 0) {
      terminal.outputErrorText('Please input the keyword')
      return
    }
    const keyword = _[0]
    const targetLink = `https://www.bing.com/search?q=${keyword}`
    if (current) {
      window.location.href = targetLink
    } else {
      window.open(targetLink)
    }
  },
}

export default bingCommand
