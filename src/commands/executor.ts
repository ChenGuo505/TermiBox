import getopts from 'getopts'
import { commandMap } from '@/commands/register.ts'
import type { Command, CommandOption } from '@/commands/command'
import helpCommand from '@/commands/helpCommand/helpCommand.ts'

export const doExecute = async (text: string, terminal: TermiBox.Terminal) => {
  text = text.trim()
  if (!text) {
    return
  }
  const command = getCommand(text)
  if (!command) {
    terminal.outputErrorText(`Command not found: ${text}`)
    return
  }
  const parsedOptions = parse(text, command)
  await execute(command, terminal, parsedOptions)
}

const getCommand = (text: string): Command => {
  const commandKey = text.split(' ', 1)[0].toLowerCase()
  return commandMap[commandKey]
}

const parse = (text: string, command: Command): getopts.ParsedOptions => {
  const { options } = command
  const opts: getopts.Options = {
    alias: {},
    default: {},
    string: [],
    boolean: [],
  }
  if (opts.alias) {
    opts.alias['help'] = ['h']
  }
  opts['boolean']?.push('help')
  if (opts.default) {
    opts.default['help'] = false
  }
  if (options) {
    options.forEach((option: CommandOption) => {
      const { key, alias, type, defaultValue } = option
      if (alias && opts.alias) {
        opts.alias[key] = alias
      }
      opts[type]?.push(key)
      if (opts.default) {
        opts.default[key] = defaultValue
      }
    })
  }
  return getopts(text.split(' ').slice(1), opts)
}

const execute = async (
  command: Command,
  terminal: TermiBox.Terminal,
  options: getopts.ParsedOptions,
) => {
  const { help } = options
  if (help) {
    const newOptions: getopts.ParsedOptions = {
      ...options,
      _: [command.key],
    }
    helpCommand.execute(terminal, newOptions)
    return
  }
  command.execute(terminal, options)
}
