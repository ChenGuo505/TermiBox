import type { Command } from '@/commands/command'
import { defineAsyncComponent } from 'vue'

const infoCommand: Command = {
  key: 'info',
  name: 'Info Command',
  desc: 'Displays information about the web-app',
  execute: (terminal, options) => {
    const { _ } = options
    if (_.length > 0) {
      terminal.outputInfoText('This command does not require any arguments 😊')
    }
    const component = defineAsyncComponent(() => import('./InfoOutput.vue'))
    terminal.outputResult(component)
  }
}

export default infoCommand
