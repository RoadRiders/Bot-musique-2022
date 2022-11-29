const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'jump',
    description: "Saut vers une piste particulière dans la file d’attente",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'le nom/url de la piste vers laquelle vous souhaitez passer',
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: 'number',
            description: 'l’endroit dans la file d’attente la chanson est dans',
            type: ApplicationCommandOptionType.Number,
            required: false,
        }
    ],

    async execute({ inter }) { 
        const track = inter.options.getString('song');
        const number =  inter.options.getNumber('number')

        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `Aucune musique ne joue actuellement ${inter.member}... réessayer ? ❌`, ephemeral: true });
        if (!track && !number) inter.reply({ content: `Vous devez utiliser l’une des options pour passer à une chanson ${inter.member}... réessayer ? ❌`, ephemeral: true });

            if (track) {
        for (let song of queue.tracks) {
            if (song.title === track || song.url === track ) {
                queue.skipTo(song)
                return inter.reply({ content: `Saut à ${track} ✅` });
            }
        }
        return inter.reply({ content: `impossible de trouver ${track} ${inter.member}... essayez d’utiliser l’url ou le nom complet de la chanson ? ❌`, ephemeral: true });    
    }
    if (number) {
        const index = number - 1
        const trackname = queue.tracks[index].title
        if (!trackname) return inter.reply({ content: `Cette dose de suivi ne semble pas exister ${inter.member}...  réessayer ?❌`, ephemeral: true });   
        queue.skipTo(index);
        return inter.reply({ content: `JSaut à ${trackname}  ✅` });
    }
         
    }
}