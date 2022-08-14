const { clientId } = require('../config.json');

module.exports = {
    name: 'messageCreate',
    async execute(message) {        
        //自分のメッセージだった場合終了
        if(message.author.bot) return;
        
        //メッセージコマンドを作ってみる
        const commandhead = 'tb!';
        const command = message.content.replace(/^tb!/, '');

        //コマンドかどうかの検知
        if(message.content.startsWith(commandhead)){
            switch(command) {
                case 'help':
                case '?':
                    await message.reply('help');
                    break;
                case 'test':
                    await message.reply('testコマンド!');
                    break;
                default:
                    await message.delete();
            }
        }
    },
}
