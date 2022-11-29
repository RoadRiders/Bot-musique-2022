module.exports = {
    name: 'resume',
    description: 'jouer la piste',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue) return inter.reply({ content: `Aucune musique ne joue actuellement ${inter.member}... réessayer ? ❌`, ephemeral: true });
        

        if(!queue.connection.paused) return inter.reply({content: `La piste est déjà lancée, ${inter.member}... réessayez ? ❌`, ephemeral: true})

        const success = queue.setPaused(false);
        
        return inter.reply({ content:success ? `La musique actuelle ${queue.current.title} a repris ✅` : `Something went wrong ${inter.member}... try again? ❌`});
    },
};
