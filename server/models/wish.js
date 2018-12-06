// var wishImages = [
//     { id: '1', wishId: '1', imageName: 'crokcpot.jpg' },
//     { id: '2', wishId: '4', imageName: 'toyota.jpg' },
//     { id: '3', wishId: '4', imageName: 'honda.jpg' }
// ];

// var wishes = [
//     { title: 'crockpt', description: 'Im trying to cook more', links: 'www.crockpot.com', id: '1', memberId: '2', wishStatsId: '1' },
//     { title: 'socks', description: 'Columbia scoks', links: 'www.columbia.com', id: '2', memberId: '2', wishStatsId: '2' },
//     { title: 'playstation', description: 'ps 4', links: 'www.playstation.com', id: '3', memberId: '1', wishStatsId: '1' },
//     { title: 'car', description: 'toyota, honda or ford', links: '', id: '4', memberId: '1', wishStatsId: '1' },
//     { title: 'world peace', description: 'Donald Trump Sucks', links: '', id: '5', memberId: '3', wishStatsId: '1' },
// ];

// var wishStatuss = [
//     { name: 'available', id: '1' },
//     { name: 'taken', id: '2' },
//     { name: 'purchased', id: '3' }
// ];

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wishSchema = new Schema({
    title: String,
    description: String,
    links: String,
    memberId: String,
    wishStatus: String,
    createdAt: String,
    updatedAt: String
});

module.exports = mongoose.model('Wish', wishSchema);

