var mongoose = require("mongoose");

var orderCatalogSchema = new mongoose.Schema({
    name: String,
    type: String,
    cost: String
});

module.exports = mongoose.model("OrderCatalog", orderCatalogSchema);