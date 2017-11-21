var mongoose = require("mongoose");

var apptSchema = new mongoose.Schema({
    date: String,
    time: String,
    reason: String,
    notes: String,
    patient: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient"
        },
        name: String
    }
});

module.exports = mongoose.model("Appointment", apptSchema);