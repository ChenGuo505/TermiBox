import type { Command } from './command'
import helloCommand from './helloCommand/helloCommand'
import clearCommand from './clearCommand/clearCommand'
import helpCommand from './helpCommand/helpCommand'
import searchCommand from './searchCommand/searchCommand'
import googleCommand from './searchCommand/googleCommand/googleCommand'
import bingCommand from './searchCommand/bingCommand/bingCommand'
import baiduCommand from './searchCommand/baiduCommand/baiduCommand'
import gotoCommand from './gotoCommand/gotoCommand'
import infoCommand from './infoCommand/infoCommand'

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
