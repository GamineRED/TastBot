import { SlashCommandBuilder, CommandInteraction } from 'discord.js';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Replies with user info'),
	async execute(interaction: CommandInteraction) {
		await interaction.reply(`Hi, <@${interaction.user.id}>\nYour tag: ${interaction.user.tag}\nYour ID: ${interaction.user.id}`);
	}
};
