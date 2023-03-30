const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('Reload a command.')
		.addStringOption(option =>
			option.setName('command')
				.setDescription('The command to reload.')
				.setRequired(true))
		.setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
	
	async execute(interaction) {
		const commandName = interaction.options.getString('command', true).toLowerCase();
		const command = interaction.client.commands.get(commandName);

		if (!command) return interaction.reply(`There is no command with name '${commandName}'!`);

		delete require.cache[require.resolve(`./${command.data.name}.cjs`)];

		try {
			interaction.client.commands.delete(command.data.name);
			const newCommand = require(`./${commandName}.cjs`);
			interaction.client.commands.set(newCommand.data.name, newCommand);
			await interaction.reply(`command '${newCommand.data.name}' was reloaded`);
		} catch (error) {
			console.error(error);
			await interaction.reply(`There was an error while reloading a command '${command.data.name}':\n'${error.message}'`);
		}
	}
}
