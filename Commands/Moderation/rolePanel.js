const { MessageActionRow, Message, MessageSelectOptionData, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: 'role-panel',
    description: "Sends a role panel.",
    permission: 'ADMINISTRATOR',
    options: [
        {
            name: "channel",
            description: "Select channel.",
            type: "CHANNEL",
            required: true
        },
        // {
        //     name: "messageid",
        //     description: "Input Message ID.",
        //     type: "STRING",
        //     required: true
        // },
        {
            name: "role",
            description: "Select Role",
            type: "ROLE",
            required: true
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client
     * @param {Message} message
     * @param {Args} args
     */
    async execute (interaction, client, args, message) {
        const channel = interaction.options.getChannel('channel');
        // const messageId = interaction.options.getChannel('ticket');
        const role = interaction.options.getRole('role')
        // const targetMessage = await channel.messages.fetch(messageId, {
        //     cache: true,
        //     force: true
        // })

        if(!channel || channel.type !== "GUILD_TEXT") {
            return interaction.reply({
                content: 'Please tag a text channel',
                ephemeral: true
            })
        }

        if(!role) {
            return interaction.reply({
                content:'Unknown role!',
                ephemeral: true
            })
        }

        // if(!targetMessage) {
        //     return interaction.reply({
        //         content:'Unknown message ID!',
        //         ephemeral: true
        //     })
        // }

        // if(targetMessage.author.id !== client.user?.id) {
        //     return interaction.reply({
        //         content:`Please provide a message ID that was sent from <@${client.user?.id}>`,
        //         ephemeral: true
        //     })
        // }

        let row = channel.components[0]
        if(!row) {
            row = new MessageActionRow()
        }

        const option = MessageSelectOptionData() = [{
            label: role.name,
            value: role.id
        }]

        let menu = row.components[0]
        if(menu) {
            for (const o of menu.options) {
                if (o.value === option[0].value) {
                    return interaction.reply({
                        custom: true,
                        content: `<@&${o.value}> is already part of this menu`,
                        allowedMentions: {
                            roles: [],
                        },
                        ephemeral: true
                    })
                }
            }
            menu.addOptions(option)
            menu.setMaxValues(menu.options.length)
        } else {
            row.addComponents(
                new MessageSelectMenu()
                .setCustomId('auto_roles')
                .setMinValues(0)
                .setMaxValues(1)
                .setPlaceholder('Select your roles...')
                .addOptions(option)
            )
        }
        
        channel.edit({
            components: [row]
        })

        return interaction.reply({
            custom: true,
            content: `Added <@&${role.id}> to the auto roles menu`,
            allowedMentions: {
                roles: []
            },
            ephemeral: true
        })
    }
}
