const { Client, Collection } = require("discord.js");
const client = new Client({intents: 131071});
const{ Token } = require("./config.json");

client.commands = new Collection();

require("./Handlers/Event")(client);
require("./Handlers/Commands")(client);
require("./Handlers/Anti-crash")(client);

client.login(Token);