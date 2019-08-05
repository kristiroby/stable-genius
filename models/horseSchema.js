const mongoose = require('mongoose');

const horseSchema = new mongoose.Schema({
    name: String,
    owner: String,
    image: String,
    age: String,
    sex: String,
    breed: String,
    turnOut: {type:Boolean, default: true},
    morningFeed: {
        hay: String,
        feed: String,
        supplements: [String]
    },
    eveningFeed: {
        hay: String,
        feed: String,
        supplements: [String]
    },
    specialInstructions: String

});

const Horse = mongoose.model('Horse', horseSchema);

module.exports = Horse;