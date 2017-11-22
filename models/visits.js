var mongoose = require("mongoose");

var visitSchema = new mongoose.Schema({
    date: String,
    time: String,
    reason: String,
    weight: String,
    medications: String,
    diagnosis: String,
    notes: String,
    cost: String,
    patient: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient"
        },
        name: String
    }
});

module.exports = mongoose.model("Visit", visitSchema); 