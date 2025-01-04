import type { Command } from '@/commands/command'
import helloCommand from '@/commands/helloCommand/helloCommand'
import clearCommand from '@/commands/clearCommand/clearCommand'
import helpCommand from '@/commands/helpCommand/helpCommand'
import searchCommand from '@/commands/searchCommand/searchCommand'
import googleCommand from '@/commands/searchCommand/googleCommand/googleCommand'
import bingCommand from '@/commands/searchCommand/bingCommand/bingCommand'
import baiduCommand from '@/commands/searchCommand/baiduCommand/baiduCommand'
import gotoCommand from '@/commands/gotoCommand/gotoCommand'
import infoCommand from '@/commands/infoCommand/infoCommand'

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
