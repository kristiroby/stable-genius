const mongoose = require('mongoose');

const horseSchema = new mongoose.Schema({
    name: String,
    owner: String,
    image: String,
    age: String,
    breed: String,
    turnOut: Boolean
});

const Horse = mongoose.model('Horse', horseSchema);

module.exports = Horse;