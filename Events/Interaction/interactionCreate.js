const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
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
    }
}