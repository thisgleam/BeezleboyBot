const rrModel = require('../../Structures/Schemas/RolesDB');
const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "remove-role",
    description: "Remove a custom reaction role.",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "role",
            description: "role to be removed",
            type: "ROLE",
            required: true
        },
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction) {
        const role = interaction.options.getRole("role");
        const guildData = await rrModel.findOne({ guildId: interaction.guildId })
        if(!guildData) return interaction.reply({content: `There is no roles inside of this server!`, ephemeral: true});

        const guildRoles = guildData.roles;
        const findRole = guildRoles.find(x => x.roleId === role.id);
        if(!findRole) return interaction.reply({content: "That role is not added to the reaction roles list", ephemeral: true})

        const filteredRoles = guildRoles.filter(x => x.roleId !== role.id)
        guildData.roles = filteredRoles;

        await guildData.save()

        return interaction.reply({content: `Removed: ${role.name}`, ephemeral: true});
    }
}