const { Player } = require('discord-player');
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

global.client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent
    ],
   disableMentions: 'everyone',
});

client.config = require('./config');

global.player = new Player(client, client.config.opt.discordPlayer);

require('./src/loader');
require('./src/events');

client.on("guildCreate", guild => {

    const channel = client.channels.cache.get("991597374512308275") //channel où le message sera envoyer
    //console.log(channel)
    let addembed = new EmbedBuilder()
        .setTitle(`${client.user.username} vient d'être ajouté sur le serveur : ${guild.name}`)
        .setThumbnail(guild.iconURL())
        .setDescription(`-Propriétaire: <@${guild.ownerId}>\n-Owner ID: ${guild.ownerId}\n-Nom du serveur : ${guild.name}\n-Id du serveur: ${guild.id}\n-Nombre de membres: ${guild.memberCount}`)
        .setColor("bf0010")
        .setTimestamp()
    .setImage("https://imgur.com/h7Gt2yC.png")
        .setFooter({text: `Merci grâce à toi nous sommes à ${client.guilds.cache.size} serveurs`});
    channel.send({embeds: [addembed]});
});

client.login(client.config.app.token);