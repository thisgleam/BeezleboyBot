const { MessageEmbed } = require("discord.js");
const { unverifiedroles, verifiedroles } = require("../../Structures/config.json");

  module.exports = {
    
    name: "interactionCreate",

    async execute (interaction) {
      
     if(interaction.isButton()) {
     if(interaction.customId === "verification") {
      
    const Embed = new MessageEmbed()

    .setDescription("✅ **Successfully Verified!**")
    .setColor("#3BFF00")

      interaction.reply({ content: `<@${interaction.user.id}>`, embeds: [Embed], ephemeral: true })

      const Unverified = unverifiedroles

      var Roles = [
          verifiedroles // You can add the number of roles you want
      ]
      
      await interaction.member.roles.add(Roles)
      await interaction.member.roles.remove(Unverified)
      
      }
    }
  }
};