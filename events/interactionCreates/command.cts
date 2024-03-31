import path from 'node:path';
import fs from 'node:fs';
import { AutocompleteInteraction, CacheType, Client, Collection, CommandInteraction, InteractionType } from 'discord.js';
import { TastBotInteractionCreate } from './interactionCreate';
import { TastBotCommand } from './commands/command';
import { TastBotClient } from '../../client';

//commandsフォルダの読み込み
const commandsPath = path.join(__dirname, './commands/');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.cts'));

//commandファイルの読み込み
const commands = new Collection<string, TastBotCommand>();
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath) as TastBotCommand;

	commands.set(command.data.name, command);
}

module.exports = new class implements TastBotInteractionCreate {
	type = InteractionType.ApplicationCommand;
	init(client: Client) {
		const tastBotClient = client as TastBotClient;
		//読み込んだcommandをclientに登録
		tastBotClient.commands = commands;

		for (const command of commands.values()) {
			try {
				if (command.init) command.init(client);
			} catch (error) {
				console.error('Command init error', error);
			}
		}
		
		console.debug('Commands initialize Completed!');
	}
	async autocomplete(interaction: AutocompleteInteraction<CacheType>) {
		const client = interaction.client as TastBotClient;
		const command = client.commands.get(interaction.commandName);
		if (!command) return;

		try {
			if (command.autocomplete) command.autocomplete(interaction);
		} catch(error) {
			console.error(error);
		}
	}
	async execute(interaction: CommandInteraction<CacheType>) {
		const client = interaction.client as TastBotClient;
		const command = client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`${interaction.command} command is none`);
			await interaction.reply({ content: 'Sorry, Command not found', ephemeral: true });
			
			return;
		}
		
		try {
			//log表示
			console.log(`${interaction.user.tag} used ${interaction} command`);
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'Sorry\nIt\'s Error', ephemeral: true });
		}
	}
};
