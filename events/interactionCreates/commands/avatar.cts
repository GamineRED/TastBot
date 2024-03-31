import { CommandInteraction, CacheType, SlashCommandBuilder } from "discord.js";
import { TastBotCommand } from "./command";

module.exports = new class implements TastBotCommand {
	data = new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Replies with your avatar');
	global = true;
	async execute(interaction: CommandInteraction<CacheType>) {
		const avatarURL = interaction.user.avatarURL();
		if (avatarURL != null) {
			await interaction.reply(avatarURL);
		} else {
			await interaction.reply({
				ephemeral: true,
				content: 'Failed getting your avatar URL'
			});
		}
	}
};
