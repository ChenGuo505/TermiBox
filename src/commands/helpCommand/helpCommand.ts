import { defineAsyncComponent } from 'vue'
import type { Command } from '@/commands/command'
import { commandMap } from '@/commands/register.ts'

const helpCommand: Command = {
  key: 'help',
  name: 'Help Command',
  desc: 'Print the help tips',
  params: [
    {
      key: 'commandName',
      desc: 'Command name',
      required: false,
    },
  ],
  execute: (terminal, options) => {
    const {_} = options
    if (_.length < 1) {
      const component = defineAsyncComponent(() => import('./DefaultHelpOutput.vue'))
      terminal.outputResult(component)
    } else if (_.length === 1) {
      const commandName = _[0]
      const command = commandMap[commandName]
      if (!command) {
        terminal.outputErrorText('Invalid parameters')
        return
      }
      const props = {
        command,
      }
      const component = defineAsyncComponent(() => import('./CommandHelpOutput.vue'))
      terminal.outputResult(component, props)
    } else {
      terminal.outputErrorText('Invalid parameters')
    }
  },
}

export default helpCommand
