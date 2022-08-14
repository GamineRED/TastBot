//依存
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { Client, Intents } from 'discord.js';
import { token } from './config.json';

//clientインスタンスを作成
const client = new Client({ intents: [
    //intentsのリストhttps://discord.com/developers/docs/topics/gateway#list-of-intents
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
] });

//eventsフォルダの読み込み
const eventsPath = join(__dirname, 'events');
const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith('.js'));

//eventファイルの読み込みと実行
for (const file of eventFiles) {
    const filePath = join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

//ログイン
client.login(token);
