var mongoose = require("mongoose");
// var Patient  = require("./patients");

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

// ownerSchema.pre('remove', function(next) {
//     // 'this' is the owner being removed. Provide callbacks here if you want to be notified of the calls' result.
//     Patient.remove({owner: this}).exec();
//     next();
// });

module.exports = mongoose.model("Owner", ownerSchema); 