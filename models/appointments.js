var mongoose = require("mongoose");

var apptSchema = new mongoose.Schema({
    date: { type: Date },
    time: String,
    reason: String,
    notes: String,
    patient: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient"
        },
        name: String,
        avatar: String
    }
});

module.exports = mongoose.model("Appointment", apptSchema);