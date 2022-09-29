module.exports = {
    name: 'ready',
    once: true, //一回だけ
    execute(client) {
        console.log(`Logged in as ${client.user.tag}`);
    }
};
