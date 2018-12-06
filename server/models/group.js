// var groupRoles = [
//     { id: '1', name: 'admin' },
//     { id: '2', name: 'member' }
// ];

// var groups = [
//     { name: 'Contreras Family', id: '1', description: 'Family gift list for Christmas' },
//     { name: 'Womens Softball Christmas list', id: '2', description: '' }
// ];

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: String,
    description: String
});

module.exports = mongoose.model('Group', groupSchema);