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

    .setTitle("🍷 Welcome to Beezleboy the Adventure")
    .setDescription(`Beezleboy is an alley consisting of 6 types of unique and funny creatures that you have never seen before. Here we build an ecosystem where the benefit of society is very important\n
    Not just 3D pfp nft, we are an ecosystem.\n
    Spread the words.\n
    React this message with ✅ to get verify.`)
    .setThumbnail("https://cdn.discordapp.com/attachments/748031852089966704/969572813667205120/fdc19e646a5577d035e6b7518a3ecbc1.png")
    .setColor("#3BFF00")
    .setFooter({text: "BeezleMods"})

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
