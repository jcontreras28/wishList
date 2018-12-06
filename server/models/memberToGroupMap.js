// var memberToGroupMaps = [
//     { id: '1', memberId: '1', groupId: '1', roleId: '1' },
//     { id: '2', memberId: '2', groupId: '1', roleId: '2' },
//     { id: '3', memberId: '2', groupId: '2', roleId: '2' },
//     { id: '5', memberId: '3', groupId: '2', roleId: '1' }
// ];

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberToGroupMapSchema = new Schema({
    memberId: String,
    groupId: String,
    roleId: String
});

module.exports = mongoose.model('MemberToGroupMap', memberToGroupMapSchema);