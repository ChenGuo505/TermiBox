import getopts from 'getopts'

interface Command {
  key: string
  name: string
  desc?: string
  alias?: string[]
  params?: CommandParam[]
  options?: CommandOption[]
  execute: (terminal: TermiBox.Terminal, options: getopts.ParsedOptions) => void
}

interface CommandParam {
  key: string
  desc?: string
  required: boolean
}

interface CommandOption {
  key: string
  alias?: string[]
  desc?: string
  type: 'string' | 'boolean'
  defaultValue: string | boolean
}
