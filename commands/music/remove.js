const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'remove',
    description: "retirer une chanson de la file d’attente",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'le nom/url de la piste à supprimer',
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
        const number =  inter.options.getNumber('number')
        const track = inter.options.getString('song');

        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `Aucune musique ne joue actuellement ${inter.member}... réessayer ? ❌`, ephemeral: true });
        if (!track && !number) inter.reply({ content: `Vous devez utiliser l’une des options pour supprimer une chanson ${inter.member}... réessayer ? ❌`, ephemeral: true });

        if (track) {

        for (let song of queue.tracks) {
            if (song.title === track || song.url === track ) {
                queue.remove(song)
                return inter.reply({ content: `suppression de ${track} de la file d’attente ✅` });
            }

        }

        return inter.reply({ content: `impossible de trouver ${track} ${inter.member}... essayez d’utiliser l’url ou le nom complet de la chanson ? ❌`, ephemeral: true });    
        }

        if (number) {

            const index = number - 1
            const trackname = queue.tracks[index].title

            if (!trackname) return inter.reply({ content: `Cette dose de suivi ne semble pas exister ${inter.member}...  réessayer ?❌`, ephemeral: true });   

            queue.remove(index);
            
            return inter.reply({ content: `suppression de ${trackname} de la file d’attente ✅` });
        }


         
    }
}