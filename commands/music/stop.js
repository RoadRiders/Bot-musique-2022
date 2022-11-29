module.exports = {
    name: 'stop',
    description: 'arrêter la piste',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content:`Aucune musique ne joue actuellement ${inter.member}... réessayer ? ❌`, ephemeral: true });

        queue.destroy();

        inter.reply({ content: `Musique arrêtée intero ce serveur, à la prochaine ✅`});
    },
};