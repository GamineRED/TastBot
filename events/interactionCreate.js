//依存
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Intents } = require('discord.js');

//clientインスタンスの作成
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

//commandsフォルダの読み込み
const commandsPath = path.join(__dirname, '..\\commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

//commandファイルの読み込み
client.commands = new Collection();
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    client.commands.set(command.data.name, command);
}

//interaction時の実行
module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        //interactionをログに出すだけ
        console.log(`${interaction.user.tag}`);

        //interactionがcommandだった時の処理
        if (interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);

            if (!command) return;

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'Sorry\nIt\'s Error', ephemeral: true });
            }
        }

        //interactionがbuttonだった時の処理
        if (interaction.isButton()) {
            const { customId } = interaction;

            if(customId === 'test0'){
                await interaction.reply('push button');
                await interaction.deleteReply();
            }
        }
    }
};
