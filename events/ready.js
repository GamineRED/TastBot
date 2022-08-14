module.exports = {
    name: 'ready',
    once: true, //一回だけ
    execute(client) {
        console.log(`--------------------------------\nReady!\nLogged in as ${client.user.tag}`);
        client.user.setPresence({
            activities: [{
                name: ''
            }],
            status: 'offline'
        })
    },
};
