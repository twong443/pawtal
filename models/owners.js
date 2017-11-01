var mongoose = require("mongoose");

var ownerSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
    address: String,
    balance: String
});

module.exports = mongoose.model("Owner", ownerSchema); 