module.exports = {
    name: 'clear',
    description: 'effacer toute la musique dans la file d’attente',
    voiceChannel: true,

    async execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `Aucune musique ne joue actuellement ${inter.member}... réessayer ? ❌`, ephemeral: true });

        if (!queue.tracks[0]) return inter.reply({ content: `Pas de musique dans la file d’attente après le ${inter.member}... réessayer ? ❌`, ephemeral: true });

        await queue.clear();

        inter.reply(`La file d’attente vient d’être vidée 🗑️`);
    },
};