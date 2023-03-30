const { Events } = require('discord.js');

module.exports = {
    type: Events.ClientReady,
    once: true, //一回だけ
    execute(client) {
        console.log(`Logged in as ${client.user.tag}`);
        client.user.setStatus('invisible');
    }
};
