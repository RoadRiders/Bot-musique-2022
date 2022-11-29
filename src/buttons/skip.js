module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.playing) return inter.reply({ content: `Aucune musique en cours de lecture... réessayer ? ❌`, ephemeral: true });
    
    const success = queue.skip();

    return inter.reply({ content: success ? `Current music ${queue.current.title} skipped ✅` : `Something went wrong ${inter.member}... try again? ❌`, ephemeral: true});
}