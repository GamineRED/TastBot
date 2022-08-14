import { SlashCommandBuilder } from '@discordjs/builders';

export const data = new SlashCommandBuilder()
    .setName('user')
    .setDescription('Replies with user info');
export async function execute(interaction) {
    await interaction.reply(`Hi, <@${interaction.user.id}>\nYour tag: ${interaction.user.tag}\nYour ID: ${interaction.user.id}`);
}
