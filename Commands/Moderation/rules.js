const { MessageEmbed } = require("discord.js");
const { ruleschannel } = require("../../Structures/config.json");

module.exports = {
  
  name: "rules",
  description: "Send the embed to the specified rules channel.",
  permission: "ADMINISTRATOR",

   async execute (interaction) {

    const { guild } = interaction;

    const RULES = ruleschannel
    
    const Embed = new MessageEmbed()

    .setTitle("📜 Server Rules")
    .setDescription(`Please follow the rules to make this community looks better.\n
    **Rules and Agreement**\n
    ➜ Be respect to all users, regardless of your liking towards them. Treat others the way you want to be treated.\n
    ➜ No offensive messages or nicknames.\n
    ➜ No spam - This includes but is not limited too, loud/obnoxious noises in voice, @mention spam, character spam, image spam, and message spam.\n
    ➜ No pornographic/adult/other NSFW material.\n
    ➜ Use the Right Channels.\n
    ➜ Context matters. Whoever you are or whatever it is, please keep content in the respective channels.`)
    .setThumbnail("https://cdn.discordapp.com/icons/940260965755285544/fdc19e646a5577d035e6b7518a3ecbc1.png?size=512")
    .setColor("DARK_RED")
    .setFooter({text: "BeezleMods"})

    await guild.channels.cache.get(RULES).send({ embeds: [Embed] })

    interaction.reply({ content: "✅ | Operation completed successfully.", ephemeral: true })
    
   }
};