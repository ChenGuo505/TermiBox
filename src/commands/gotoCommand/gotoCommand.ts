import type { Command } from '@/commands/command'
import { aliases } from '@/commands/gotoCommand/gotoUtils.ts'
import { defineAsyncComponent } from 'vue'

const gotoCommand: Command = {
  key: 'goto',
  name: 'Goto Command',
  desc: 'Go to a website',
  params: [
    {
      key: 'destination',
      desc: 'The destination website',
      required: true,
    },
  ],
  options: [
    {
      key: 'url',
      desc: 'Regard the destination as a url',
      alias: ['u'],
      type: 'boolean',
      defaultValue: false,
    },
    {
      key: 'current',
      desc: 'Open in current page',
      alias: ['c'],
      type: 'boolean',
      defaultValue: false,
    },
    {
      key: 'list',
      desc: 'List all aliases',
      alias: ['l', 'ls'],
      type: 'boolean',
      defaultValue: false,
    },
  ],
  execute: (terminal, options) => {
    const { _, current, url, list } = options
    if (list) {
      const component = defineAsyncComponent(() => import('./ListGotoOutput.vue'))
      terminal.outputResult(component)
    } else {
      if (_.length === 0) {
        terminal.outputErrorText('Please input the destination')
        return
      }
      const destination = _[0]
      let urlValue: string
      if (url) {
        urlValue = destination
        if (!urlValue.startsWith('http://') && !urlValue.startsWith('https://')) {
          urlValue = 'https://' + urlValue
        }
      } else {
        urlValue = aliases[destination]
        if (!urlValue) {
          terminal.outputErrorText('Alias not found')
          return
        }
      }
      terminal.outputInfoText(`Going to ${urlValue}`)
      if (current) {
        window.location.href = urlValue
      } else {
        window.open(urlValue)
      }
    }
  },
}

export default gotoCommand
