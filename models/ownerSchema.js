const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    name: String,
    number: String,
    email: String,
    address: Srting
});

const Owner = mongoose.model('Owner', ownerSchema);

module.exports = Owner;