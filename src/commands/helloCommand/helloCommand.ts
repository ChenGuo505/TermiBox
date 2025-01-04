import type { Command } from '@/commands/command'
import { defineAsyncComponent } from 'vue'

const helloCommand: Command = {
  key: 'hello',
  name: 'Hello Command',
  desc: 'Greetings',
  params: [
    {
      key: 'color',
      desc: 'Text\'s color, default white',
      required: false,
    }
  ],
  execute: (terminal, options) => {
    const {_} = options;
    if (_.length < 1) {
      const props = {
        color: 'white',
      }
      const component = defineAsyncComponent(()=>import('./HelloOutput.vue'))
      terminal.outputResult(component, props)
    } else if (_.length === 1) {
      const color = _[0]
      const props = {
        color,
      }
      const component = defineAsyncComponent(()=>import('./HelloOutput.vue'))
      terminal.outputResult(component, props)
    } else {
      terminal.outputErrorText('Invalid parameters')
    }
  },
}

export default helloCommand
