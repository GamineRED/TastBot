//依存
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { clientId, guildId, token } from './config.json';

//commandsフォルダの読み込み
const commandsPath = join(__dirname, 'commands');
const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));

//commandファイルを読み込みcommandsに追加
const guildCommands = [];
const globalCommands = [];
for (const file of commandFiles) {
    const filePath = join(commandsPath, file);
    const command = require(filePath);
    if(command.global){
        globalCommands.push(command.data.toJSON());
    } else {
        guildCommands.push(command.data.toJSON());
    }
}

//(確か)コマンド追加APIのインスタンスを作成
const rest = new REST({ version: 9 }).setToken(token);

//グローバルコマンドのリセット
rest.put(Routes.applicationCommands(clientId), { body: {} })
    .then(() => console.log('Successfully reset application commands.'))
    .catch(console.error);

//ギルドコマンドのリセット
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: {} })
    .then(() => console.log('Successfully reset application guild commands.'))
    .catch(console.error);

//グローバルコマンドの追加
rest.put(Routes.applicationCommands(clientId), { body: globalCommands })
    .then(() => console.log('Successfully registered application commads.'))
    .catch(console.error);

//ギルドコマンドの追加
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: guildCommands })
    .then(() => console.log('Successfully registered application guild commands.'))
    .catch(console.error);
