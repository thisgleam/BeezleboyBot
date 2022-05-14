const { Client, Collection } = require("discord.js");
const client = new Client({intents: 131071});
const{ Token } = require("./config.json");
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");

client.commands = new Collection();

require("./Handlers/Anti-crash")(client);
require("./Handlers/Twitter")(client);

["Events", "Commands"].forEach(handler => {
    require(`./Handlers/${handler}`)(client, PG, Ascii)
});

client.login(Token);