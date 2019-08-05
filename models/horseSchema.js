const mongoose = require('mongoose');

const horseSchema = new mongoose.Schema({
    name: String,
    age: String,
    owner: String
});

const Horse = mongoose.model('Horse', horseSchema);

module.exports = Horse;