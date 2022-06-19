const { clientId } = require('../config.json');

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        //自分のメッセージだった場合終了
        if(message.author.id === clientId) return;
        message.channel.send(message.content)
    },
}
