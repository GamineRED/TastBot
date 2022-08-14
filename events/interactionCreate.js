//依存
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { Client, Collection, Intents } from 'discord.js';

//clientインスタンスの作成
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

//commandsフォルダの読み込み
const commandsPath = join(__dirname, '..\\commands');
const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));

//commandファイルの読み込み
client.commands = new Collection();
for (const file of commandFiles) {
    const filePath = join(commandsPath, file);
    const command = require(filePath);

    client.commands.set(command.data.name, command);
}

//interaction時の実行
export const name = 'interactionCreate';
export async function execute(interaction) {
    //interactionがcommandだった時の処理
    if (interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName);

        if (!command)
            return;

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
