const { Client } = require("discord.js");
const client = new Client({intents: 131071});
const{ Token } = require("./config.json");

require("./Handlers/Event")(client);

client.login(Token);