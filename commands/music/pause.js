module.exports = {
    name: 'pause',
    description: 'mettre en pause la piste',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue) return inter.reply({ content: `Aucune musique ne joue actuellement ${inter.member}... réessayer ? ❌`, ephemeral: true });
        
        if(queue.connection.paused) return inter.reply({content: 'The track is currently paused!', ephemeral: true})

        if(queue.connection.paused) return inter.reply({content: `La piste est actuellement en pause, ${inter.member}... réessayer ? ❌`, ephemeral: true})

        const success = queue.setPaused(true);
        
        return inter.reply({ content: success ? `Musique actuelle  ${queue.current.title} en pause ✅` : `Quelque chose a mal tourné ${inter.member}... réessayer ? ❌` });
    },
};
