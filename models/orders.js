var mongoose = require("mongoose");

var orderSchema = new mongoose.Schema({
    name: String,
    type: String,
    cost: String
});

module.exports = mongoose.model("Order", orderSchema);