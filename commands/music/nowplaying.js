const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
    name: 'nowplaying',
    description: 'voir ce qui se passe!',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue) return inter.reply({ content: `Aucune musique ne joue actuellement ${inter.member}... réessayer ? ❌`, ephemeral: true });

        const track = queue.current;

        const methods = ['disabled', 'track', 'queue'];

        const timestamp = queue.getPlayerTimestamp();

        const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;

        const progress = queue.createProgressBar();
        

        const embed = new EmbedBuilder()
        .setAuthor({ name: track.title,  iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })})
        .setThumbnail(track.thumbnail)
        .setDescription(`Volume **${queue.volume}**%\nDuration **${trackDuration}**\nProgrès ${progress}\nMode de Loop **${methods[queue.repeatMode]}**\nRequesté par ${track.requestedBy}`)
        .setFooter({ text: 'Red Line Tps, VTC Euro Truck Simulator 2', iconURL: inter.member.avatarURL({ dynamic: true })})
        .setColor('ff0000')
        .setTimestamp()

        const saveButton = new ButtonBuilder()
        .setLabel('Enregistrer cette piste')
        .setCustomId(JSON.stringify({ffb: 'savetrack'}))
        .setStyle('Danger')

        const volumeup = new ButtonBuilder()
        .setLabel('volume haut')
        .setCustomId(JSON.stringify({ffb: 'volumeup'}))
        .setStyle('Primary')

        const volumedown = new ButtonBuilder()
        .setLabel('volume bas')
        .setCustomId(JSON.stringify({ffb: 'volumedown'}))
        .setStyle('Primary')

        const loop = new ButtonBuilder()
        .setLabel('boucle')
        .setCustomId(JSON.stringify({ffb: 'loop'}))
        .setStyle('Danger')

        const resumepause = new ButtonBuilder()
         .setLabel('Reprise et pause')
         .setCustomId(JSON.stringify({ffb: 'resume&pause'}))
         .setStyle('Success')



        const row = new ActionRowBuilder().addComponents(volumedown, saveButton, resumepause, loop, volumeup);

         inter.reply({ embeds: [embed], components: [row] });
    },
};