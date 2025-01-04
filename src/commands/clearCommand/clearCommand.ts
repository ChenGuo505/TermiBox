import type { Command } from '@/commands/command'

const clearCommand: Command = {
  key: 'clear',
  name: 'Clear Command',
  desc: 'Clears the terminal',
  execute: (terminal, options) => {
    const { _ } = options
    if (_.length > 0) {
      terminal.outputInfoText('This command does not require any arguments')
    }
    terminal.clear()
  },
}

export default clearCommand
