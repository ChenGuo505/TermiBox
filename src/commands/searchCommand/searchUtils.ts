import type { Command } from '@/commands/command'
import googleCommand from '@/commands/searchCommand/googleCommand/googleCommand.ts'
import bingCommand from '@/commands/searchCommand/bingCommand/bingCommand.ts'
import baiduCommand from '@/commands/searchCommand/baiduCommand/baiduCommand.ts'

const searchEngines: Record<string, Command> = {
  google: googleCommand,
  bing: bingCommand,
  baidu: baiduCommand
}

export { searchEngines }
