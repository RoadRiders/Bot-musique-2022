const maxVol = client.config.opt.maxVol;
module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.playing) return inter.reply({ content: `Aucune musique en cours de lecture... réessayer ? ❌`, ephemeral: true });

    const vol = Math.floor(queue.volume + 5)

    if (vol > maxVol ) return inter.reply({ content: `Je ne peux plus augmenter le volume de ${inter.member}... réessayer ? ❌`, ephemeral: true })

    if (queue.volume === vol) return inter.reply({ content: `Le volume que vous souhaitez modifier est déjà celui actuel ${inter.member}... réessayer ? ❌`, ephemeral: true });

    const success = queue.setVolume(vol);

    return inter.reply({ content:success ? `Le volume a été modifié à **${vol}**/**${maxVol}**% 🔊` : `Something went wrong ${inter.member}... try again? ❌`, ephemeral: true});
}