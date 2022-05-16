const rrModel = require('../../Structures/Schemas/RolesDB');
const { Client, CommandInteraction, MessageActionRow, MessageSelectMenu } = require("discord.js");

module.exports = {
    name: "panel",
    description: "reaction role panel.",
    permission: "ADMINISTRATOR",
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const guildData = await rrModel.findOne({ guildId: interaction.guildId })
        if(!guildData?.roles) return interaction.reply({content: `There is no roles inside of this server!`, ephemeral: true});

        const options = guildData.roles.map(x => {
            const role = interaction.guild.roles.cache.get(x.roleId);

            return {
                label: role.name,
                value: role.id,
                description: x.roleDescription || "No description",
                emoji: x.roleEmoji
            };
        });

        const components = [
            new MessageActionRow().addComponents(
                menu = new MessageSelectMenu()
                    .setCustomId('reaction-roles')
                    .setPlaceholder('Select a reaction role')
                    .setMaxValues(1)
                    .addOptions(options)
            )
        ];

        interaction.reply({content: "sent", ephemeral: true})
        interaction.channel.send({content: "**Beezleboy Club** Assignable Roles", components})
    }
}