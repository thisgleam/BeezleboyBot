const { Schema, model } = require('mongoose');

module.exports = model("SetupDB", new Schema({
    guildId: String,
    supportId: String,
    supportCatId: String
}))