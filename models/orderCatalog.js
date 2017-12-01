var mongoose = require("mongoose");

var orderCatalogSchema = new mongoose.Schema({
    name: String,
    type: String,
    cost: {type: Number}
});

module.exports = mongoose.model("OrderCatalog", orderCatalogSchema);