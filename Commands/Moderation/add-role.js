const rrModel = require('../../Structures/Schemas/RolesDB');
const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "add-role",
    description: "Add a custom reaction role.",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "role",
            description: "role to be assigned",
            type: "ROLE",
            required: true
        },
        {
            name: "description",
            description: "description of this role",
            type: "STRING",
            required: false
        },
        {
            name: "emoji",
            description: "Emoji for the role",
            type: "STRING",
            required: false
        },
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction) {
        const role = interaction.options.getRole("role");
        const roleDescription = interaction.options.getString("description") || null;
        const roleEmoji = interaction.options.getString("emoji") || null;

        if (role.position >= interaction.guild.me.roles.highest.position)
        return interaction.followUp("I cant assign a role that is higher or equal than me :)");

        const guildData = await rrModel.findOne({ guidlId: interaction.guildId })

        const newRole = {
            roleId: role.id,
            roleDescription,
            roleEmoji,
        }

        if(guildData) {
            const roleData = guildData.roles.find((x) => x.roleId === role.id)

            if(roleData) {
                roleData = newRole;
            } else {
                guildData.roles = [...guildData.roles, newRole]
            }

            await guildData.save()
        } else {
            await rrModel.create({
                guildId: interaction.guildId,
                roles: newRole
            })
        }

        return interaction.reply({content: `Created a new role: ${role.name}`, ephemeral: true});
        
    }
}