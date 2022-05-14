const { Client } = require("discord.js");
const mongoose = require("mongoose");
const { Database } = require("../../Structures/config.json");

module.exports = {
    name: "ready",
    once: true, 
    /**
     * 
     * @param {Client} client 
     */
    execute(client) {
        console.log("Bot Online :) -thisgleam")
        client.user.setActivity("Beezleboy Club", {type: "WATCHING"});

        if(!Database) return;
        mongoose.connect(Database, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("Tersambung Ke Database")
        }).catch((err) => {
            console.log(err)
        });
    }
}