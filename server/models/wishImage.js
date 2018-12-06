const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wishImageSchema = new Schema({
    wishId: String,
    imageName: String
});


module.exports = mongoose.model('WishImage', wishImageSchema);