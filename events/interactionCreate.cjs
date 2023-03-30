const path = require('node:path');
const fs = require('node:fs');
const { Collection, Events } = require('discord.js');

//commandsフォルダの読み込み
const commandsPath = path.join(__dirname, './interactionCreate/commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.cjs'));

//commandファイルの読み込み
let commands = new Collection();
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    commands.set(command.data.name, command);
}

//moduleの情報
module.exports = {
	type: Events.InteractionCreate,
	//初期化関数
	//読み込んだcommandをclientに登録
	init(client) {
		client.commands = commands;
		console.log('interactionCreate event initialize completed!');
	},

	//interaction時の実行
    async execute(interaction) {
        //interactionがcommandだった時の処理
        if (interaction.isCommand()) {
            const command = commands.get(interaction.commandName);
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
};
