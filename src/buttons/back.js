module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.playing) return inter.reply({ content: `Aucune musique en cours de lecture... réessayer ? ❌`, ephemeral: true });

    if (!queue.previousTracks[1]) return inter.reply({ content: `Aucune musique n’a été jouée avant ${inter.member}... réessayer ? ❌`, ephemeral: true });

    await queue.back();

    inter.reply({ content:`Jouer la **piste précédente** ✅`, ephemeral: true});
}
