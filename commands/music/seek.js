const ms = require('ms');
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'seek',
    description: 'Revenir en arrière ou avancer dans une chanson',
    voiceChannel: true,
    options: [
    {
        name: 'time',
        description: 'temps que vous voulez passer à',
        type: ApplicationCommandOptionType.String,
        required: true,
    }
    ],
    async execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `Aucune musique ne joue actuellement ${inter.reply}... réessayez ? ❌`, ephemeral: true });

        const timeToMS = ms(inter.options.getString('time'));

        if (timeToMS >= queue.current.durationMS) return inter.reply({ content:`L’heure indiquée est supérieure au temps total de la chanson actuelle ${inter.member}... réessayer ? ❌\n*Essayez par exemple un temps valide comme **5s, 10s, 20 secondes, 1m**...*`, ephemeral: true });

        await queue.seek(timeToMS);

        inter.reply({ content: `Heure fixée pour la chanson en cours **${ms(timeToMS, { long: true })}** ✅`});
    },
};