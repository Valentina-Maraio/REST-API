const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Item schema
const ItemSchema = new Schema({
    name: {
        type: String,
        requires: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Item', ItemSchema)