const { Client } = require("discord.js");
const client = new Client({intents: 131071});
const{ Token } = require("./config.json");

client.once("ready", () => {
    console.log("Bot Online :) -thisgleam");
    client.user.setActivity("Beezleboy Club", {type: "WATCHING"})
})

client.login(Token);