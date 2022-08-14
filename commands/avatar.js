const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Replies with your avatar'),
    global: true,
    async execute(interaction) {
        await interaction.reply(`https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.webp`);
        console.log(interaction.user);
    },
}
