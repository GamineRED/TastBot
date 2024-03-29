const path = require('node:path');
const fs = require('node:fs');
const { Collection } = require('discord.js');

//commandsフォルダの読み込み
const commandsPath = path.join(__dirname, './commands/');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.cjs'));

//commandファイルの読み込み
let commands = new Collection();
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

	commands.set(command.data.name, command);
}

module.exports = {
	type: 'command',
	init(client) {
		//読み込んだcommandをclientに登録
		client.commands = commands;

		for (const command of commands.values()) {
			try {
				if (command.init) command.init(client);
			} catch (error) {
				console.error('Command init error', error);
			}
		}
	},
	async autocomplete(interaction) {
		const command = interaction.client.commands.get(interaction.commandName);
		if (!command) return;

		try {
			command.autocomplete(interaction);
		} catch(error) {
			console.error(error);
		}
	},
	async execute(interaction) {
		const command = interaction.client.commands.get(interaction.commandName);
		if (!command) return;
		
		try {
			//log表示
			console.log(`${interaction.user.tag} used ${interaction} command`);
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'Sorry\nIt\'s Error', ephemeral: true });
		}
	}
}
