const { Schema, model } = require('mongoose');

module.exports = model("RolesDB", new Schema({
    guildId: String,
    roles: Array
}))
