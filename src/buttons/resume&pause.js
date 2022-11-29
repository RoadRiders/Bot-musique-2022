module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.playing) return inter.reply({ content: `Aucune musique en cours de lecture... réessayer ? ❌`, ephemeral: true });

    const success = queue.setPaused(false);
    
    if (!success) queue.setPaused(true);
    

    return inter.reply({ content: `${success ? `Musique actuelle ${queue.current.title} en pause ✅` : `Musique actuelle ${queue.current.title} reprise ✅`}`, ephemeral: true});
}