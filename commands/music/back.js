module.exports = {
    name: 'back',
    description: "Repasser la chanson avant",
    voiceChannel: true,

    async execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `Aucune musique en cours de lecture ${inter.member}... réessayer ? ❌`, ephemeral: true });

        if (!queue.previousTracks[1]) return inter.reply({ content: `Aucune musique n’a été jouée avant ${inter.member}... réessayer ? ❌`, ephemeral: true });

        await queue.back();

        inter.reply({ content:`Jouer la **piste précédente** ✅`});
    },
};