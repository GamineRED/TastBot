const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Replies with user info'),
    async execute(interaction) {
        await interaction.reply(`Hi, <@${interaction.user.id}>\nYour tag: ${interaction.user.tag}\nYour ID: ${interaction.user.id}`);
    }
};
