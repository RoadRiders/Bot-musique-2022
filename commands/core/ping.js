const ms = require('ms');

module.exports = {
    name: 'ping',
    description: "Obtenir le ping du bot!",
    async execute({ client, inter }) {

        const m = await inter.reply("Ping?")
        inter.editReply(`La latence de l’API Pong! est de ${Math.round(client.ws.ping)}ms 🛰️, dernier battement cardiaque calculé ${ms(Date.now() - client.ws.shards.first().lastPingTimestamp, { long: true })} ago`)

    },
};