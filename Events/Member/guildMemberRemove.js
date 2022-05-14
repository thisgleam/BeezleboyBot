const { MessageEmbed, WebhookClient, GuildMember } = require("discord.js");
const { urlwelcomeleavelog } = require("../../Structures/config.json");

module.exports = {
    name : "guildMemberRemove",
    /**
     * 
     * @param {GuildMember} member 
     */
    execute(member) {
        
        const { user, guild } = member;
        
        // https://discord.com/api/webhooks/111111111111111111/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        //                                   THIS ID            THIS TOKEN
        const Leaver = new WebhookClient({url: urlwelcomeleavelog});

        const Leave = new MessageEmbed()

        .setColor("DARK_RED")
        .setAuthor({ name: "LEFT", iconURL: user.avatarURL({dynamic: true, size: 512})})
        // .setAuthor({ name: user.tag, iconURL: user.avatarURL({dynamic: true, size: 512})})
        .setThumbnail(user.avatarURL({dynamic: true, size: 512}))
        .setDescription(`
        ${member} has left the server\n
        Joined: <t:${parseInt(member.joinedTimestamp / 1000)}:R>`)
        .setFooter({ text: `Tag: ${user.tag} | ID: ${user.id} | Count: ${guild.memberCount}`});

        Leaver.send({embeds: [Leave]})
    }
}