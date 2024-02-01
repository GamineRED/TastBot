//依存
const fs = require('node:fs');
const path = require('node:path');
const { REST, Routes } = require('discord.js');
const { clientID, guildID, token } = require('./config.json');

//commandsフォルダの読み込み
const commandsPath = path.join(__dirname, 'events/interactionCreate/command');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.cjs'));

//commandファイルを読み込み各種commandsに追加
const globalCommands = [];
const guildCommands = [];
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	if (command.global) {
		globalCommands.push(command.data.toJSON());
	} else {
		guildCommands.push(command.data.toJSON());
	}
}

//(確か)コマンド追加APIのインスタンスを作成
const rest = new REST().setToken(token);

//グローバルコマンドのセット
if (process.argv[2] == 'global') {
	rest.put(Routes.applicationCommands(clientID), { body: globalCommands })
	.then(() => console.log('Successfully registered application commads.'))
	.catch(console.error);
}

//ギルドコマンドのセット
rest.put(Routes.applicationGuildCommands(clientID, guildID), { body: guildCommands })
	.then(() => console.log('Successfully registered application guild commands.'))
	.catch(console.error);
