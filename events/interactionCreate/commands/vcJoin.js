const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vcjoin')
        .setDescription('Desprict')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('join channel')
                .setRequired(true)),
    async execute(interaction) {
        const channel = interaction.options.get('channel').channel;
        
        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guildId,
            adapterCreator: channel.guild.voiceAdapterCreator
        })
    }
}
