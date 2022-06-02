const { MessageEmbed,  MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
    name: 'ticket-panel',
    description: "Sends a ticket pannel to a channel.",
    permission: 'ADMINISTRATOR',
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client
     */
    async execute (interaction, client) {
        const embed = new MessageEmbed()
            .setAuthor({ name: "Beezleboy Support", iconURL: client.user.displayAvatarURL({ dynamic: true })})
            .setColor("RED")
            .setDescription(
                "Create a support ticket to chat support Beezleboy Club."
            )

            const bt = new MessageActionRow()
            // .addComponents(
            //     new MessageButton()
            //     .setCustomId('player')
            //     .setLabel('Report a player')
            //     .setEmoji('<:security:944350352797483059>')
            //     .setStyle('SUCCESS'),
            // )
            // .addComponents(
            //     new MessageButton()
            //     .setCustomId('bug')
            //     .setLabel('Report a bug')
            //     .setEmoji('<:dnd_status:923209325990801428>')
            //     .setStyle('SUCCESS'),
            // )
            // .addComponents(
            //     new MessageButton()
            //     .setCustomId('feed')
            //     .setLabel('Send some feedback')
            //     .setEmoji('<:boost:923209020607717437>')
            //     .setStyle('SUCCESS'),
            // )
            .addComponents(
                new MessageButton()
                .setCustomId('staff')
                .setLabel('Chat to Beezlemods')
                .setEmoji('<:discordstaff:923208049961869343>')
                .setStyle('DANGER'),
            )
            // .addComponents(
            //     new MessageButton()
            //     .setCustomId('other')
            //     .setLabel('Other')
            //     .setEmoji('<:DiscordQuestion:923209094687522906>')
            //     .setStyle('SECONDARY'),
            //     )

        interaction.reply({
            content: 'Panel sent',
            ephemeral: true,
        })
        // channel.send({embeds: [embed], components: [bt]})
        interaction.channel.send({embeds: [embed], components: [bt]})
    }
}
