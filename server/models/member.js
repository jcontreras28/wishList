// var members = [
//     { firstname: 'Darren', lastnamne: 'Contreras', email: 'darren@some.com', id: '1' },
//     { firstname: 'Taylor', lastnamne: 'Contreras', email: 'taylor@some.com', id: '2' },
//     { firstname: 'Dallas', lastnamne: 'Contreras', email: 'dallas@some.com', id: '3' },
// ];

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    fbid: String
});

module.exports = mongoose.model('Member', memberSchema);