var mongoose = require("mongoose");

var billingSchema = new mongoose.Schema({
    orders: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Order"
            },
            cost: String
        }
    ],
    visit: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Visit"
        },
        date: String,
        time: String
    }
});

module.exports = mongoose.model("Billing", billingSchema); 