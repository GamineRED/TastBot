const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
		global: true,
	async execute(interaction) {
		Client_BotPing = Date.now() - interaction.createdTimestamp;
		DiscordAPI_BotPing = interaction.client.ws.ping;
		await interaction.reply(`\
BOT --> Discord: **${DiscordAPI_BotPing}**ms
Client --> BOT: **${Client_BotPing}**ms
Client --> Discord: **${Client_BotPing-DiscordAPI_BotPing}**ms`
		);
	}
};
