const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const setupSchema = require('../../Structures/Schemas/SetupDB')
const { botid } = require("../../Structures/config.json");

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     * @returns 
     */
    async execute (interaction, client) {
        if(interaction.isCommand() || interaction.isContextMenu()) {
            const command = client.commands.get(interaction.commandName);
            if(!command) return interaction.reply({embeds: [
                new MessageEmbed()
                .setColor("RED")
                .setDescription("⛔️ An error occured while running this command.")
            ]}) && client.commands.delete(interaction.commandName);

            command.execute(interaction, client);
            if (!interaction.member.permissions.has(command.permission)) {
                return interaction.reply({ content: `You do not have the required permission for this command: \`${interaction.commandName}\`.`, ephemeral: true })
            }
        }

        if(interaction.isSelectMenu()) {
            if(interaction.customId !== 'reaction-roles') return;
            // await interaction.deferReply({ephemeral: true})
            const roleId = interaction.values[0];
            const memberRoles = interaction.member.roles;

            const hasRole = memberRoles.cache.has(roleId);
            
            if(hasRole) {
                memberRoles.remove(roleId);
                interaction.reply({content: 'Your role list has been modified.', ephemeral: true})
            } else {
                memberRoles.add(roleId)
                interaction.reply({content: 'Your role list has been modified.', ephemeral: true})
            }
        }

        if (interaction.isButton()) {
            if (interaction.customId === 'other') {
                const guild = interaction.guild;
                const user = interaction.user
                const check = guild.channels.cache.find((c) => c.topic === `${user.id}`)
                const doc = await setupSchema.findOne({guildId: interaction.guild.id})
                const supportRoleId = doc.supportId
                const catId = doc.supportCatId
                const staff = doc.supportId
                
                if (!check) {
                    const x = interaction.guild.channels.create(`${interaction.user.tag}`, {
                        permissionOverwrites: [{
                                id: interaction.user.id,
                                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'ADD_REACTIONS', 'EMBED_LINKS', 'ATTACH_FILES']
                            },
                            {
                                id: interaction.guild.roles.everyone,
                                deny: ['VIEW_CHANNEL']
                            },
                            {
                                id: supportRoleId,
                                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'MANAGE_MESSAGES', 'MANAGE_CHANNELS']
                            },
                            {
                                id: botid,
                                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'MANAGE_MESSAGES', 'MANAGE_CHANNELS']
                            }
                        ],
                        type: 'text',
                        parent: catId,
                        topic: interaction.user.id
                    }).then(async channel => {
                        channel.send({
                            content: `Welcome <@${interaction.user.id}> <@&${staff}>`,
                            embeds: [embed],
                            components: [del]
                        })
                    }).then(interaction.reply({
                        content: `Created ticket`,
                        ephemeral: true
                    }))
    
                    const embed = new MessageEmbed()
                        .setTitle('Ticket | OTHER')
                        .setDescription('Hello,\nStaff will be with you as soon as possible. Meanwhile please tell us about your issue\nThank You!')
                        .setFooter({
                            text: 'Only staff can close tickets'
                        })
                        .setColor('GREEN')
                        .setTimestamp()
    
                    const del = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                            .setCustomId('lock')
                            .setLabel('🔒 Lock Ticket')
                            .setStyle('SECONDARY')
                        )
                        .addComponents(
                            new MessageButton()
                            .setCustomId('unlock')
                            .setLabel('🔓 Unlock Ticket')
                            .setStyle('SUCCESS')
                        )
                } else {
                    interaction.reply({
                        custom: true,
                        content: "You already have an open ticket",
                        ephemeral: true,
                    })
                }
            } else if (interaction.customId === 'player') {
    
                const guild = interaction.guild;
                const user = interaction.user
                const check = guild.channels.cache.find((c) => c.topic === `${user.id}`)
                const doc = await setupSchema.findOne({guildId: interaction.guild.id})
                const supportRoleId = doc.supportId
                const catId = doc.supportCatId
                const staff = doc.supportId
    
                if (!check) {
                    const x = interaction.guild.channels.create(`${interaction.user.tag}`, {
                        permissionOverwrites: [{
                                id: interaction.user.id,
                                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'ADD_REACTIONS', 'EMBED_LINKS', 'ATTACH_FILES']
                            },
                            {
                                id: interaction.guild.roles.everyone,
                                deny: ['VIEW_CHANNEL']
                            },
                            {
                                id: supportRoleId,
                                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'MANAGE_MESSAGES']
                            },
                            {
                                id: botid,
                                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'MANAGE_MESSAGES', 'MANAGE_CHANNELS']
                            }
                        ],
                        type: 'text',
                        parent: catId,
                        topic: interaction.user.id
                    }).then(async channel => {
                        channel.send({
                            content: `Welcome <@${interaction.user.id}> <@&${staff}>`,
                            embeds: [embed],
                            components: [del]
                        })
                    }).then(interaction.reply({
                        content: `Created ticket`,
                        ephemeral: true
                    }))
    
                    const embed = new MessageEmbed()
                        .setTitle('Ticket | PLAYER REPORT')
                        .setDescription('Hello,\nStaff will be with you as soon as possible. Meanwhile please tell us about your issue\nThank You!\n\n**Report Template:**\n\`\`\`Offender:\nReason:\nProof:\nOther Notes:\`\`\`')
                        .setFooter({
                            text: 'Only staff can close tickets'
                        })
                        .setColor('GREEN')
                        .setTimestamp()
    
                    const del = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                            .setCustomId('lock')
                            .setLabel('🔒 Lock Ticket')
                            .setStyle('SECONDARY')
                        )
                        .addComponents(
                            new MessageButton()
                            .setCustomId('unlock')
                            .setLabel('🔓 Unlock Ticket')
                            .setStyle('SUCCESS')
                        )
                } else {
                    interaction.reply({
                        custom: true,
                        content: "You already have an open ticket",
                        ephemeral: true,
                    })
                }
    
            } else if (interaction.customId === 'staff') {
    
                const doc = await setupSchema.findOne({guildId: interaction.guild.id})
                const guild = interaction.guild;
                const user = interaction.user
                const check = guild.channels.cache.find((c) => c.topic === `${user.id}`)
                const catId = doc.supportCatId
    
                if (!check) {
                    const x = interaction.guild.channels.create(`${interaction.user.tag}`, {
                        permissionOverwrites: [{
                                id: interaction.user.id,
                                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'ADD_REACTIONS', 'EMBED_LINKS', 'ATTACH_FILES']
                            },
                            {
                                id: interaction.guild.roles.everyone,
                                deny: ['VIEW_CHANNEL']
                            },
                            {
                                id: botid,
                                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'MANAGE_MESSAGES', 'MANAGE_CHANNELS']
                            },
                        ],
                        type: 'text',
                        parent: catId,
                        topic: interaction.user.id
                    }).then(async channel => {
                        channel.send({
                            content: `Welcome <@${interaction.user.id}>`,
                            embeds: [embed],
                            components: [del]
                        })
                    }).then(interaction.reply({
                        content: `Created ticket`,
                        ephemeral: true
                    }))
    
                    const embed = new MessageEmbed()
                        .setTitle('Ticket | STAFF REPORT')
                        .setDescription('Hello,\nStaff will be with you as soon as possible. Meanwhile please tell us about your issue\nThank You!\n\n**Report Template:**\n\`\`\`Offender:\nReason:\nProof:\nOther Notes:\`\`\`')
                        .setFooter({
                            text: 'Only staff can close tickets'
                        })
                        .setColor('GREEN')
                        .setTimestamp()
    
                    const del = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                            .setCustomId('lock')
                            .setLabel('🔒 Lock Ticket')
                            .setStyle('SECONDARY')
                        )
                        .addComponents(
                            new MessageButton()
                            .setCustomId('unlock')
                            .setLabel('🔓 Unlock Ticket')
                            .setStyle('SUCCESS')
                        )
                } else {
                    interaction.reply({
                        custom: true,
                        content: "You already have an open ticket",
                        ephemeral: true,
                    })
                }
    
            } else if (interaction.customId === 'bug') {
    
                const guild = interaction.guild;
                const user = interaction.user
                const check = guild.channels.cache.find((c) => c.topic === `${user.id}`)
                const doc = await setupSchema.findOne({guildId: interaction.guild.id})
                const supportRoleId = doc.supportId
                const catId = doc.supportCatId
                const staff = doc.supportId
    
                if (!check) {
                    const x = interaction.guild.channels.create(`${interaction.user.tag}`, {
                        permissionOverwrites: [{
                                id: interaction.user.id,
                                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'ADD_REACTIONS', 'EMBED_LINKS', 'ATTACH_FILES']
                            },
                            {
                                id: interaction.guild.roles.everyone,
                                deny: ['VIEW_CHANNEL']
                            },
                            {
                                id: supportRoleId,
                                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'MANAGE_MESSAGES', 'MANAGE_CHANNELS']
                            },
                            {
                                id: botid,
                                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'MANAGE_MESSAGES', 'MANAGE_CHANNELS']
                            }
                        ],
                        type: 'text',
                        parent: catId,
                        topic: interaction.user.id
                    }).then(async channel => {
                        channel.send({
                            content: `Welcome <@${interaction.user.id}> <@&${staff}>`,
                            embeds: [embed],
                            components: [del]
                        })
                    }).then(interaction.reply({
                        content: `Created ticket`,
                        ephemeral: true
                    }))
    
                    const embed = new MessageEmbed()
                        .setTitle('Ticket | BUG REPORT')
                        .setDescription('Hello,\nStaff will be with you as soon as possible. Meanwhile please tell us about your issue\nThank You!\n\n**Report Template:**\n\`\`\`**Bug:**\n**How you found it:**\n**Proof:**\n**Other Notes:**\`\`\`')
                        .setFooter({text: 'Only the support team can delete tickets | Bugs must be reproduceable'})
                        .setColor('GREEN')
                        .setTimestamp()
    
                    const del = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                            .setCustomId('lock')
                            .setLabel('🔒 Lock Ticket')
                            .setStyle('SECONDARY')
                        )
                        .addComponents(
                            new MessageButton()
                            .setCustomId('unlock')
                            .setLabel('🔓 Unlock Ticket')
                            .setStyle('SUCCESS')
                        )
                } else {
                    interaction.reply({
                        custom: true,
                        content: "You already have an open ticket",
                        ephemeral: true,
                    })
                }
    
            } else if (interaction.customId === 'feed') {
    
                const guild = interaction.guild;
                const user = interaction.user
                const check = guild.channels.cache.find((c) => c.topic === `${user.id}`)
                const doc = await setupSchema.findOne({guildId: interaction.guild.id})
                const supportRoleId = doc.supportId
                const catId = doc.supportCatId
                const staff = doc.supportId
    
                if (!check) {
                    const x = interaction.guild.channels.create(`${interaction.user.tag}`, {
                        permissionOverwrites: [{
                                id: interaction.user.id,
                                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'ADD_REACTIONS', 'EMBED_LINKS', 'ATTACH_FILES']
                            },
                            {
                                id: interaction.guild.roles.everyone,
                                deny: ['VIEW_CHANNEL']
                            },
                            {
                                id: supportRoleId,
                                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'MANAGE_MESSAGES', 'MANAGE_CHANNELS']
                            },
                            {
                                id: botid,
                                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'MANAGE_MESSAGES', 'MANAGE_CHANNELS']
                            }
                        ],
                        type: 'text',
                        parent: catId,
                        topic: interaction.user.id
                    }).then(async channel => {
                        channel.send({
                            content: `Welcome <@${interaction.user.id}> <@&${staff}>`,
                            embeds: [embed],
                            components: [del]
                        })
                    }).then(interaction.reply({
                        content: `Created ticket`,
                        ephemeral: true
                    }))
    
                    const embed = new MessageEmbed()
                        .setTitle('Ticket | FEEDBACK')
                        .setDescription('Hello,\nStaff will be with you as soon as possible. Meanwhile please tell us about your issue\nThank You!')
                        .setFooter({
                            text: 'Only staff can close tickets'
                        })
                        .setColor('GREEN')
                        .setTimestamp()
    
                    const del = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                            .setCustomId('lock')
                            .setLabel('🔒 Lock Ticket')
                            .setStyle('SECONDARY')
                        )
                        .addComponents(
                            new MessageButton()
                            .setCustomId('unlock')
                            .setLabel('🔓 Unlock Ticket')
                            .setStyle('SUCCESS')
                        )
                } else {
                    interaction.reply({
                        custom: true,
                        content: "You already have an open ticket",
                        ephemeral: true,
                    })
                }
            } else if (interaction.customId === 'lock') {
                if (interaction.member.permissions.has('MANAGE_MESSAGES')) {
                    const thread = interaction.channel
                    const userThread = thread.topic
    
                    thread.permissionOverwrites.edit(userThread, { VIEW_CHANNEL: false })
                    interaction.reply({custom: true, content: `Locked this ticket`, ephemeral: true})
                } else interaction.reply({custom: true, content: 'You cannot do this', ephemeral: true})
    
            } else if (interaction.customId === 'unlock') {
                if (interaction.member.permissions.has('MANAGE_MESSAGES')) {
                    const thread = interaction.channel
                    const userThread = thread.topic
                    
                    thread.permissionOverwrites.edit(userThread, { VIEW_CHANNEL: true })
                    interaction.reply({custom: true, content: `Unlocked this ticket`, ephemeral: true})
                } else interaction.reply({custom: true, content: 'You cannot do this', ephemeral: true})
    
            }
    
    
        }
    }
}