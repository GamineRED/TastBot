import { SlashCommandBuilder, CacheType, CommandInteraction } from "discord.js";
import { TastBotCommand } from "./command";

module.exports = new class implements TastBotCommand {
	data = new SlashCommandBuilder()
		.setName('server')
		.setDescription('Replies with server info');
	async execute(interaction: CommandInteraction<CacheType>) {
		await interaction.reply(`Server name: ${interaction.guild?.name}\nTotal menbers: ${interaction.guild?.memberCount}`);
	}
};
