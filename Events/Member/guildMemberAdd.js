const { MessageEmbed, WebhookClient, GuildMember } = require("discord.js");
const { ruleschannel, urlwelcomeleavelog, unverifiedroles } = require("../../Structures/config.json");

module.exports = {
    name : "guildMemberAdd",
    /**
     * 
     * @param {GuildMember} member 
     */
    execute(member) {
        
        const { user, guild } = member;

        member.roles.add(unverifiedroles)        
        // https://discord.com/api/webhooks/111111111111111111/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        //                                   THIS ID            THIS TOKEN
        const Welcomer = new WebhookClient({url: urlwelcomeleavelog});

        const Welcome = new MessageEmbed()
        .setColor("DARK_RED")
        // .setAuthor({ name: user.tag, iconURL: user.avatarURL({dynamic: true, size: 512})})
        .setAuthor({ name: "WELCOME", iconURL: user.avatarURL({dynamic: true, size: 512})})
        .setThumbnail(user.avatarURL({dynamic: true, size: 512}))
        .setDescription(`
        Welcome to **${guild.name}**\nAccound Created: <t:${parseInt(user.createdTimestamp / 1000)}:R>\n
        We kindly ask you to familiarize yourself with our rules over at <#${ruleschannel}>`)
        .setFooter({ text: `Tag: ${user.tag} | ID: ${user.id} | Count: ${guild.memberCount}`});

        //Welcomer.send({embeds: [Welcome]})
        Welcomer.send({ content: `<@${user.id}>`, embeds: [Welcome]});
    }
}