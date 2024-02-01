const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Replies with your avatar'),
	global: true,
	async execute(interaction) {
	await interaction.reply(interaction.user.avatarURL());
	}
};
