import { ApplicationCommandOptionType, CacheType, CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { TastBotCommand } from './command';

module.exports = new class implements TastBotCommand {
	data = new SlashCommandBuilder()
		.setName('echo')
		.setDescription('Replies with Pong!')
		.addStringOption(option => option.setName('input')
			.setDescription('The input to echo back')
			.setRequired(true)) as SlashCommandBuilder;
	async execute(interaction: CommandInteraction<CacheType>) {
		const echoOption = interaction.options.get('input', true);
		if (echoOption.type != ApplicationCommandOptionType.String) return;
		
		let content = echoOption.value as string;
		if (content.length <= 2000) {
			content = content.replaceAll('\\n', '\n');

			await interaction.reply({ content, allowedMentions: { repliedUser: false} });
		} else {
			await interaction.reply({ content: 'Message size is too large', ephemeral: true });
		}
	}
};
