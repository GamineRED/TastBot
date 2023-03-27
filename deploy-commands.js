//依存
const fs = require('node:fs');
const path = require('node:path');
const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');

//commandsフォルダの読み込み
const commandsPath = path.join(__dirname, 'events/interactionCreate/commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

//commandファイルを読み込みcommandsに追加
const guildCommands = [];
const globalCommands = [];
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if(command.global){
        globalCommands.push(command.data.toJSON());
    } else {
        guildCommands.push(command.data.toJSON());
    }
}

//(確か)コマンド追加APIのインスタンスを作成
const rest = new REST({ version: '10' }).setToken(token);

//グローバルコマンドのセット
rest.put(Routes.applicationCommands(clientId), { body: globalCommands })
    .then(() => console.log('Successfully registered application commads.'))
    .catch(console.error);

//ギルドコマンドのセット
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: guildCommands })
    .then(() => console.log('Successfully registered application guild commands.'))
    .catch(console.error);
