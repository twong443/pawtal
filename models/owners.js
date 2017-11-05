var mongoose = require("mongoose");
var random = require("mongoose-simple-random");

var ownerSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    phone: String,
    email: String,
    address: String,
    balance: String
});

ownerSchema.plugin(random);

module.exports = mongoose.model("Owner", ownerSchema); 