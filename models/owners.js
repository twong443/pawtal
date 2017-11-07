var mongoose = require("mongoose");

var ownerSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    phone: String,
    email: String,
    address: {
        street: String,
        secondAddress: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    },
    balance: String
});

module.exports = mongoose.model("Owner", ownerSchema); 