var mongoose = require("mongoose");

var visitSchema = new mongoose.Schema({
    date: String,
    time: String,
    reason: String,
    weight: String,
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "OrderCatalog" 
        }
    ],
    diagnosis: String,
    notes: String,
    totalCost: Number,
    patient: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient"
        },
        name: String
    }
});

module.exports = mongoose.model("Visit", visitSchema); 