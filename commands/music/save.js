const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'save',
    description: 'enregistrer la piste actuelle!',
    voiceChannel: true,

    async execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue) return inter.reply({ content: `Aucune musique ne joue actuellement ${inter.member}... réessayer ? ❌`, ephemeral: true });

        inter.member.send({
            embeds: [
                new EmbedBuilder()
                    .setColor('Red')
                    .setTitle(`:arrow_forward: ${queue.current.title}`)
                    .setURL(queue.current.url)
                    .addFields(
                        { name: ':hourglass: Duration:', value: `\`${queue.current.duration}\``, inline: true },
                        { name: 'Song by:', value: `\`${queue.current.author}\``, inline: true },
                        { name: 'Views :eyes:', value: `\`${Number(queue.current.views).toLocaleString()}\``, inline: true },
                        { name: 'Song URL:', value: `\`${queue.current.url}\`` }
                    )
                    .setThumbnail(queue.current.thumbnail)
                    .setFooter({text:`du serveur ${inter.member.guild.name}`, iconURL: inter.member.guild.iconURL({ dynamic: false })})
            ]
        }).then(() => {
            return inter.reply({ content: `Je vous ai envoyé le titre de la musique par messages privés ✅`, ephemeral: true });
        }).catch(error => {
            return inter.reply({ content: `Impossible de vous envoyer un message privé... réessayer ? ❌`, ephemeral: true });
        });
    },
};