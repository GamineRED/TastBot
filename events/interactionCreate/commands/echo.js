const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Replies with Pong!')
        .addStringOption(option => option.setName('input')
            .setDescription('The input to echo back')
            .setRequired(true)),
    async execute(interaction) {
		const content = interaction.options.getString('input');

		if (content.length <= 2000) {
			await interaction.reply({ content, allowedMentions: { repliedUser: false } });
		} else {
			await interaction.reply({ content: 'メッセージサイズが大きすぎます', ephemeral: true });
		}
    }
};
