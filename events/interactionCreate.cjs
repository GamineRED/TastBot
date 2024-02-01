const path = require('node:path');
const fs = require('node:fs');
const { Events } = require('discord.js');

//interactionCreateフォルダの読み込み
const interactionCreatesPath = path.join(__dirname, './interactionCreate/');
const interactionCreateFiles = fs.readdirSync(interactionCreatesPath).filter(file => file.endsWith('.cjs'));

const interactionCreates = new Map();
for (const file of interactionCreateFiles) {
	const filePath = path.join(interactionCreatesPath, file)
	const interactionCreate = require(filePath);

	interactionCreates.set(interactionCreate.type, interactionCreate);
}

//moduleの情報
module.exports = {
	type: Events.InteractionCreate,
	//初期化関数
	init(client) {
		for (const interactionCreate of interactionCreates.values()) {
			if (interactionCreate.init) interactionCreate.init(client);
		}
		
		console.log('interactionCreate event initialize completed!');
	},

	//interaction時の実行
	async execute(interaction) {
		//interactionがcommandだった時の処理
		if (interaction.isCommand()) {
			interactionCreates.get('command').execute(interaction);
		}
	}
};
