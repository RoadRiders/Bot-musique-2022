const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'queue',
    description: 'Obtenir les chansons dans la file d’attente',
    voiceChannel: true,

    execute({ client, inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue) return inter.reply({ content: `Aucune musique ne joue actuellement ${inter.member}... réessayer ? ❌`, ephemeral: true });

        if (!queue.tracks[0]) return  inter.reply({ content: `Pas de musique dans la file d’attente après le ${inter.member}... réessayer ? ❌`, ephemeral: true });

        const methods = ['', '🔁', '🔂'];

        const songs = queue.tracks.length;

        const nextSongs = songs > 5 ? `Et **${songs - 5}** autre(s)chanson(s)...` : `In the playlist **${songs}** song(s)...`;

        const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author} (demandé par : ${track.requestedBy.username})`)

        const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setThumbnail(inter.guild.iconURL({ size: 2048, dynamic: true }))
        .setAuthor({name: `Server queue - ${inter.guild.name} ${methods[queue.repeatMode]}`, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })})
        .setDescription(`Current ${queue.current.title}\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`)
        .setTimestamp()
        .setFooter({ text: 'Red Line Tps, VTC Euro Truck Simulator 2', iconURL: inter.member.avatarURL({ dynamic: true })})

        inter.reply({ embeds: [embed] });
    },
};