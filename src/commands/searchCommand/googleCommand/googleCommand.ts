import type { Command } from '@/commands/command'

const googleCommand: Command = {
  key: 'google',
  name: 'google Command',
  desc: 'Search on google',
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
    const targetLink = `https://www.google.com/search?q=${keyword}`
    if (current) {
      window.location.href = targetLink
    } else {
      window.open(targetLink)
    }
  },
}

export default googleCommand
