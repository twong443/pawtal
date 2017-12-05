var mongoose = require("mongoose");

var transactionSchema = new mongoose.Schema({
    visit: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Visit"
            },
            date: String,
            time: String,
            totalCost: Number
        }
    ],
    balance: Number,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient"
    }
});

module.exports = mongoose.model("Billing", billingSchema); 