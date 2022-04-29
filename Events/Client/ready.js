const { Client } = require("discord.js");

module.exports = {
    name: "ready",
    once: true, 
    /**
     * 
     * @param {Client} client 
     */
    execute(client) {
        console.log("Bot Online :) -thisgleam")
        client.user.setActivity("Beezleboy Club", {type: "WATCHING"})
    }
}