var mongoose = require("mongoose");

var ownerSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    phone: String,
    email: String,
    address: String,
    balance: String,
    pets:{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient"
        }
    }
});

module.exports = mongoose.model("Owner", ownerSchema); 