import type { Command } from '@/commands/command'
import helloCommand from '@/commands/helloCommand/helloCommand.ts'
import clearCommand from '@/commands/clearCommand/clearCommand.ts'
import helpCommand from '@/commands/helpCommand/helpCommand.ts'
import searchCommand from '@/commands/searchCommand/searchCommand.ts'
import googleCommand from '@/commands/searchCommand/googleCommand/googleCommand.ts'
import gotoCommand from '@/commands/gotoCommand/gotoCommand.ts'
import baiduCommand from '@/commands/searchCommand/baiduCommand/baiduCommand.ts'
import bingCommand from '@/commands/searchCommand/bingCommand/bingCommand.ts'
import infoCommand from '@/commands/infoCommand/infoCommand.ts'

const commandList: Command[] = [
  helloCommand,
  clearCommand,
  helpCommand,
  searchCommand,
  googleCommand,
  bingCommand,
  baiduCommand,
  gotoCommand,
  infoCommand,
]

const commandMap: Record<string, Command> = {}

commandList.forEach((command) => {
  commandMap[command.key] = command
  command.alias?.forEach((alias) => {
    commandMap[alias] = command
  })
})

export { commandList, commandMap }
