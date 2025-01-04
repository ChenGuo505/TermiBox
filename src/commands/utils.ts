import type { Command, CommandOption } from '@/commands/command'

export const getUsageStr = (command: Command): string => {
  const { key, params, options } = command
  let str = key
  if (params && params.length > 0) {
    const paramsStrList: string[] = params.map((param) => {
      const word = param.key
      if (param.required) {
        return `<${word}>`
      } else {
        return `[${word}]`
      }
    })
    str += ' ' + paramsStrList.join(' ')
  }
  if (options && options.length > 0) {
    str += ' ' + '[Options]'
  }
  return str
}

export const getOptionStr = (option: CommandOption): string => {
  const { key, alias } = option
  const optionKeyStr = `--${key}`
  const optionAliasStrArr: string[] = []
  if (alias && alias.length > 0) {
    alias.forEach((a) => {
      optionAliasStrArr.push(`-${a}`)
    })
  }
  const optionAliasStr = optionAliasStrArr.join(', ')
  return optionAliasStr + (optionAliasStr ? ', ' : '') + optionKeyStr
}
