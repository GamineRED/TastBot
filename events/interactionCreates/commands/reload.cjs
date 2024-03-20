const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

let commands;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('Reload a command.')
		.addStringOption(option =>
			option.setName('command')
				.setDescription('The command to reload.')
				.setRequired(true)
				.setAutocomplete(true))
		.setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
	init(client) {
		commands = Array.from(client.commands.keys());
	},
	async autocomplete(interaction) {
		const focusedValue = interaction.options.getFocused();
		const choices = commands;
		const filtered = choices.filter(choice => choice.startsWith(focusedValue));
		await interaction.respond(
			filtered.map(choice => ({ name: choice, value: choice })),
		);
	},
	async execute(interaction) {
		const commandName = interaction.options.getString('command', true).toLowerCase();
		const command = interaction.client.commands.get(commandName);

		if (!command) return interaction.reply(`There is no command with name '${commandName}'!`);

		delete require.cache[require.resolve(`./${command.data.name}.cjs`)];

		try {
			interaction.client.commands.delete(command.data.name);
			const newCommand = require(`./${commandName}.cjs`);
			interaction.client.commands.set(newCommand.data.name, newCommand);
			if (newCommand.init) newCommand.init(interaction.client);
			await interaction.reply(`command '${newCommand.data.name}' was reloaded`);
		} catch (error) {
			console.error(error);
			await interaction.reply(`There was an error while reloading a command '${command.data.name}':\n'${error.message}'`);
		}
	}
}
