const { ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'controller',
    description: "canal de réglage",
    voiceChannel: false,
    permissions: PermissionsBitField.Flags.ManageMessages,
    options: [
        {
            name: 'channel',
            description: 'le canal auquel vous souhaitez l’envoyer',
            type: ApplicationCommandOptionType.Channel,
            required: true,
        }
    ],
    async execute({ inter, client }) { 
      let Channel = inter.options.getChannel('channel');
      if (Channel.type !== 0) return inter.reply({ content: `Vous devez l’envoyer à un canal de texte.. ❌`, ephemeral: true})

    
      const embed = new EmbedBuilder()
       .setTitle('contrôler votre musique à partir des boutons ci-dessous')
       .setImage(inter.guild.iconURL({ size: 4096, dynamic: true }))
       .setColor('#FF0000')
       .setFooter({ text: 'Red Line Tps, VTC Euro Truck Simulator 2', iconURL: inter.member.avatarURL({ dynamic: true })})


         inter.reply({ content: `contrôleur d’envoi à ${Channel}... ✅`, ephemeral: true})

         const back = new ButtonBuilder()
         .setLabel('Back')
         .setCustomId(JSON.stringify({ffb: 'back'}))
         .setStyle('Primary')

         const skip = new ButtonBuilder()
         .setLabel('Skip')
         .setCustomId(JSON.stringify({ffb: 'skip'}))
         .setStyle('Primary')

         const resumepause = new ButtonBuilder()
         .setLabel('Resume & Pause')
         .setCustomId(JSON.stringify({ffb: 'resume&pause'}))
         .setStyle('Danger')

         const save = new ButtonBuilder()
         .setLabel('Save')
         .setCustomId(JSON.stringify({ffb: 'savetrack'}))
         .setStyle('Success')

         const volumeup = new ButtonBuilder()
         .setLabel('Volume up')
         .setCustomId(JSON.stringify({ffb: 'volumeup'}))
         .setStyle('Primary')

         const volumedown = new ButtonBuilder()
         .setLabel('Volume Down')
         .setCustomId(JSON.stringify({ffb: 'volumedown'}))
         .setStyle('Primary')

         const loop = new ButtonBuilder()
         .setLabel('Loop')
         .setCustomId(JSON.stringify({ffb: 'loop'}))
         .setStyle('Danger')

         const np = new ButtonBuilder()
         .setLabel('Now Playing')
         .setCustomId(JSON.stringify({ffb: 'nowplaying'}))
         .setStyle('Secondary')
         
         const queuebutton = new ButtonBuilder()
         .setLabel('Queue')
         .setCustomId(JSON.stringify({ffb: 'queue'}))
         .setStyle('Secondary')


         const row1 = new ActionRowBuilder().addComponents(back, queuebutton, resumepause, np, skip)
         const row2 = new ActionRowBuilder().addComponents(volumedown, loop, save, volumeup)



        Channel.send({ embeds: [embed], components: [row1, row2] })

    },
}
