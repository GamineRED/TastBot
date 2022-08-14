import { SlashCommandBuilder } from '@discordjs/builders';

export const data = new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Replies with your avatar');
export const global = true;
export async function execute(interaction) {
    await interaction.reply(interaction.user.avatarURL());
}
