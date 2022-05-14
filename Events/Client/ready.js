const { Client } = require("discord.js");
const mongoose = require("mongoose");
const { Database } = require("../../Structures/config.json");
const osUtils = require("os-utils");
const ms = require("ms");
const DB = require('../../Structures/Schemas/ClientDB');

// -------------- Events --------------//

// Memory Data Update
let memArray = [];

setInterval(async () => {
  //Used Memory in GB
  memArray.push((osUtils.totalmem() - osUtils.freemem()) / 1024);

  if (memArray.length >= 14) {
    memArray.shift();
  }

  // Store in Database
  await DB.findOneAndUpdate({
      Client: true,
    }, {
      Memory: memArray,
    }, {
      upsert: true,
    });
}, ms("5s")); //= 5000 (ms)


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