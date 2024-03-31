import { CacheType, CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { TastBotCommand } from './command';

module.exports = new class implements TastBotCommand {
	data = new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!');
	global = true;
	async execute(interaction: CommandInteraction<CacheType>) {
		const DiscordAPI_BotPing = interaction.client.ws.ping;
		await interaction.reply(`\
BOT --> Discord: **${DiscordAPI_BotPing}**ms`
		);
	}
};
