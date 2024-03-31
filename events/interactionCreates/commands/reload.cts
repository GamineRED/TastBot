import { SlashCommandBuilder, PermissionsBitField, AutocompleteInteraction, CommandInteraction } from 'discord.js';
import { TastBotCommand } from './command';
import { TastBotClient } from '../../../client';

let commands: Array<string>;

module.exports = new class implements TastBotCommand {
	data = new SlashCommandBuilder()
		.setName('reload')
		.setDescription('Reload a command.')
		.addStringOption(option =>
			option.setName('command')
				.setDescription('The command to reload.')
				.setRequired(true)
				.setAutocomplete(true))
		.setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator);
	init(client: TastBotClient) {
		commands = Array.from(client.commands.keys());
	}
	async autocomplete(interaction: AutocompleteInteraction) {
		const focusedValue = interaction.options.getFocused();
		const choices = commands;
		const filtered = choices.filter(choice => choice.startsWith(focusedValue));
		await interaction.respond(
			filtered.map(choice => ({ name: choice, value: choice })),
		);
	}
	async execute(interaction: CommandInteraction) {
		const tastBotClient = interaction.client as TastBotClient;

		const commandName = interaction.options.get('command', true).value as string;
		const command = tastBotClient.commands.get(commandName);

		if (!command) return interaction.reply(`There is no command with name '${commandName}'!`);

		delete require.cache[require.resolve(`./${command.data.name}.cts`)];

		try {
			tastBotClient.commands.delete(command.data.name);
			const newCommand = require(`./${commandName}.cts`);
			tastBotClient.commands.set(newCommand.data.name, newCommand);
			if (newCommand.init) newCommand.init(interaction.client);
			await interaction.reply(`command '${newCommand.data.name}' was reloaded`);
		} catch (error: unknown) {
			if (!(error instanceof Error)) return;
			console.error(error);
			await interaction.reply(`There was an error while reloading a command '${command.data.name}':\n'${error.message}'`);
		}
	}
}
