const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupRoleSchema = new Schema({
    name: String
});

module.exports = mongoose.model('GroupRole', groupRoleSchema);