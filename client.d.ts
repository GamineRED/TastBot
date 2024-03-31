import { Client, Collection } from 'discord.js'
import { TastBotCommand } from './events/interactionCreates/commands/command'

type TastBotClient = Client & { commands: Collection<string, TastBotCommand> }
