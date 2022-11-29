const { ApplicationCommandOptionType } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    name: 'playnext',
    description: "chanson que vous voulez playnext",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'la chanson que vous voulez jouer après',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute({ inter }) { 
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `Aucune musique ne joue actuellement ${inter.member}... réessayer ? ❌`, ephemeral: true });

        const song = inter.options.getString('song');

        const res = await player.search(song, {
            requestedBy: inter.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return inter.reply({ content: `Aucun résultat trouvé ${inter.member}... réessayer ? ❌`, ephemeral: true });

       if (res.playlist) return inter.reply({ content: `Cette commande dose ne supporte pas la playlist ${inter.member}... réessayer ? ❌`, ephemeral: true });

        queue.insert(res.tracks[0], 0)

        await inter.reply({ content:`La piste a été insérée dans la file d’attente... elle sera jouée ensuite 🎧`});

    }
}