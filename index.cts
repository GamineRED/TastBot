//依存
import fs from 'node:fs';
import path from 'node:path';
import { Client, GatewayIntentBits } from 'discord.js';
import { token } from './config.json';
import { TastBotEvent } from './events/event';

//clientインスタンスを作成
const client = new Client({ intents: [
	//intentsのリストhttps://discord.com/developers/docs/topics/gateway#list-of-intents
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages
] });

//eventsフォルダの読み込み
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.cts'));

//eventファイルの読み込みと実行
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath) as TastBotEvent;

	//初期化関数の実装
	if (event.init) event.init(client);

	//エベント登録
	if (event.once) {
		client.once(event.type, (...args) => event.execute(...args));
	} else {
		client.on(event.type, (...args) => event.execute(...args));
	}
}

//ログイン
client.login(token);
