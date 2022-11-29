const { ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js');

player.on('error', (queue, error) => {
    console.log(`Erreur émise par la file d’attente ${error.message}`);
});

player.on('connectionError', (queue, error) => {
    console.log(`Erreur émise par la connexion ${error.message}`);
});

player.on('trackStart', (queue, track) => {
    if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;
    const embed = new EmbedBuilder()
    .setAuthor({name: `Commencé à jouer ${track.title} dans ${queue.connection.channel.name} 🎧`, iconURL: track.requestedBy.avatarURL()})
    .setColor('#13f857')

    const back = new ButtonBuilder()
    .setLabel('Back')
    .setCustomId(JSON.stringify({ffb: 'back'}))
    .setStyle('Primary')

    const skip = new ButtonBuilder()
    .setLabel('Skip')
    .setCustomId(JSON.stringify({ffb: 'skip'}))
    .setStyle('Primary')

    const resumepause = new ButtonBuilder()
    .setLabel('Resume & Pause')
    .setCustomId(JSON.stringify({ffb: 'resume&pause'}))
    .setStyle('Danger')

    const loop = new ButtonBuilder()
    .setLabel('Loop')
    .setCustomId(JSON.stringify({ffb: 'loop'}))
    .setStyle('Secondary')
    
    const queuebutton = new ButtonBuilder()
    .setLabel('Queue')
    .setCustomId(JSON.stringify({ffb: 'queue'}))
    .setStyle('Secondary')

    const row1 = new ActionRowBuilder().addComponents(back, loop, resumepause, queuebutton, skip)
    queue.metadata.send({ embeds: [embed], components: [row1] })
});

player.on('trackAdd', (queue, track) => {
   
    queue.metadata.send(`Suivi ${track.title} ajouté dans la file d’attente ✅`);
});

player.on('botDisconnect', (queue) => {
    queue.metadata.send('J’ai été déconnecté manuellement du canal vocal, j’ai fait la queue... ❌');
});

player.on('channelEmpty', (queue) => {
    queue.metadata.send('Personne n’est dans la chaîne vocale, quittant la chaîne vocale... ❌');
});

player.on('queueEnd', (queue) => {
    queue.metadata.send('J’ai fini de lire toute la file ✅');
});

player.on('tracksAdd', (queue, tracks) => {
    queue.metadata.send(`Toutes les chansons de la playlist ajoutées dans la file d’attente ✅`);
});