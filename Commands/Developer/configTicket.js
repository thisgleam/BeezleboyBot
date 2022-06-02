const { MessageEmbed } = require('discord.js')
const setupSchema = require('../../Structures/Schemas/SetupDB')
module.exports = {
    name: 'config',
    description: 'Config for Ticket.',
    permissions: 'ADMINISTRATOR',
    options: [
        {
            name: 'view',
            description: 'View the current setup',
            type: 'SUB_COMMAND'
        },
        {
            name: 'reset',
            description: 'Reset the config',
            type: 'SUB_COMMAND',
        },
        {
            name: 'support-role',
            description: 'Set the support role for ticketing',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'role',
                    description: 'The support role for ticketing',
                    type: 'ROLE',
                    required: true,
                },
            ],
        },
        {
            name: 'support-category',
            description: 'Set the support category for ticketing',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'category',
                    description: 'The category where tickets will be opened',
                    type: 'CHANNEL',
                    channelTypes: ['GUILD_CATEGORY'],
                    required: true,
                },
            ],
        },
    ],
    async execute (interaction) {
        if (interaction.options.getSubcommand() === 'support-role') {
            const role = interaction.options.getRole('role')
            const roleID = role.id

            const doc = await setupSchema.findOneAndUpdate({
                guildId: interaction.guild.id
            }, {
                supportId: roleID
            })
            if(!doc) {
                await setupSchema.create({guildId: interaction.guild.id})
            }
            interaction.reply({
                content: `Set the support role to <@&${roleID}>`,
                ephemeral: true,
            })
        }

        else if (interaction.options.getSubcommand() === 'support-category') {
            const cat = interaction.options.getChannel('category')
            const catId = cat.id

            const doc1 = await setupSchema.findOneAndUpdate({
                guildId: interaction.guild.id
            }, {
                supportCatId: catId

            })
            if(!doc1) {
                await setupSchema.create({guildId: interaction.guild.id})
            }
            interaction.reply({
                content: `Set the support category to <#${catId}>`,
                ephemeral: true,
            })
        }
        
        else if (interaction.options.getSubcommand() === 'view') {
            const doc = await setupSchema.findOne({
                guildId: interaction.guild.id
            })
            if (!doc) {
                setupSchema.create({guildId: interaction.guild.id})
                return `I couldn't find this server in my database. Please try again`
            }

            const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Bot Settings')
            .setFields(
                {name: `Support Role`, value: `${doc.supportId ? `<@&${doc.supportId}>` : 'None'}`, inline: true},
                {name: `Support Category`, value: `${doc.supportCatId ? `<#${doc.supportCatId}>` : 'None'}`, inline: true},
            )

            interaction.reply({embeds: [embed]})
        }
        else if (interaction.options.getSubcommand() === 'reset') {
            const result = await setupSchema.findOne({guildId: interaction.guild.id})
            if (result) {
                result.delete()
                interaction.reply('Reset the config data')
            } else {
                interaction.reply(`There was no config set`)
            }
        }
        }
}