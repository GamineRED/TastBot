//依存
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

//clientインスタンスを作成
const client = new Client({ intents: [
    //intentsのリストhttps://discord.com/developers/docs/topics/gateway#list-of-intents
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages
] });

//eventsフォルダの読み込み
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

//eventファイルの読み込みと実行
for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);

	//初期化関数の実装
	if (event.init) event.init(client);

	//エベント登録
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

//ログイン
client.login(token);
