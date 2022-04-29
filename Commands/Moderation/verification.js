const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { verifychanel } = require("../../config.json");

module.exports = {
  
  name: "verification",
  description: "Send the embed to the specified verification channel.",
  permission: "ADMINISTRATOR",

   async execute (interaction) {

    const { guild } = interaction;

    const VERIFICATION = verifychanel
    
    const Embed = new MessageEmbed()

    .setTitle("✅ | Verification")
    .setDescription("Click the button to verify yourself!")
    .setColor("#3BFF00")

    const Row = new MessageActionRow()

    .addComponents(
      
      new MessageButton()
      .setStyle("SUCCESS")
      .setCustomId("verification")
      .setLabel("Verify")
      .setEmoji("✅")
      
    );

    await guild.channels.cache.get(VERIFICATION).send({ embeds: [Embed], components: [Row] })

    interaction.reply({ content: "✅ | Operation completed successfully.", ephemeral: true })
    
   }
};