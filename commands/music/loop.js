const { QueueRepeatMode } = require('discord-player');
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'loop',
    description: 'activer ou désactiver la boucle des chansons ou la file d’attente complète',
    voiceChannel: true,
    options: [
        {
        name: 'action' ,
        description: 'quelle action vous souhaitez réaliser sur la boucle',
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
            { name: 'Queue', value: 'enable_loop_queue' },
            { name: 'Disable', value: 'disable_loop'},
            { name: 'Song', value: 'enable_loop_song' },
        ],
    }
    ],
    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `Aucune musique ne joue actuellement ${inter.member}... réessayer? ❌`, ephemeral: true });
        switch (inter.options._hoistedOptions.map(x => x.value).toString()) {
            case 'enable_loop_queue': {
                if (queue.repeatMode === 1) return inter.reply({ content:`Vous devez d’abord désactiver la musique en cours en mode boucle (/loop Disable) ${inter.member}... réessayer ? ❌`, ephemeral: true });

                const success = queue.setRepeatMode( QueueRepeatMode.QUEUE);

                return inter.reply({ content:success ? `Répéter le mode **activé** la file d’attente sera répétée sans fin 🔁` : `Something went wrong ${inter.member}... try again? ❌` });
                break
            }
            case 'disable_loop': {
                const success = queue.setRepeatMode(QueueRepeatMode.OFF);

                return inter.reply({ content:success ? `Répéter le mode **disabled**` : `Something went wrong ${inter.member}... try again? ❌` });
                break
            }
            case 'enable_loop_song': {
                if (queue.repeatMode === 2) return inter.reply({ content:`Vous devez d’abord désactiver la musique en cours en mode boucle (/loop Disable) ${inter.member}... réessayer ? ❌`, ephemeral: true });

                const success = queue.setRepeatMode( QueueRepeatMode.TRACK);
                
                return inter.reply({ content:success ? `Mode de répétition **activé** La chanson courante sera répétée sans fin (vous pouvez terminer la boucle avec /loop disable)` : `Something went wrong ${inter.member}... try again? ❌` });
                break
            }
        }
       
    },
};