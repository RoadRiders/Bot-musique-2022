module.exports = {
    name: 'skip',
    description: 'arrêter la piste',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

         if (!queue || !queue.playing) return inter.reply({ content:`Aucune musique ne joue actuellement ${inter.member}... réessayer ? ❌`, ephemeral: true });

        const success = queue.skip();

        return inter.reply({ content: success ? `Current music ${queue.current.title} skipped ✅` : `Something went wrong ${inter.member}... try again? ❌`});
    },
};