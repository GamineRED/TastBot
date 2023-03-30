const { MessageActionRow, MessageButton, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('Testiftghng command'),
    async execute(interaction) {
        const row0 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('test0')
                    .setLabel('0')
                    .setStyle('PRIMARY')
            );

        const row1 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('test1')
                    .setLabel('1')
                    .setStyle('SECONDARY')
            );
        await interaction.reply({ components: [row0, row1] });
    }
};
