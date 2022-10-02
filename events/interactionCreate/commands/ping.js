const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        await interaction.reply(`BOT --- Discord: **${interaction.client.ws.ping}**ms\nUser --- BOT: **${Math.abs(interaction.createdTimestamp-new Date().getTime())}**ms`
        );
    }
};
