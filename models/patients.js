var mongoose = require("mongoose");

var patientSchema = new mongoose.Schema({
    name: String,
    dob: { type: Date },
    gender: String,
	type: String,
    breed: String,
    color: String,
    weight: String,
    allergies: String,
    lastVisited: { type: Date },
    avatar: String,
    owner: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Owner"
        },
        firstName: String,
        lastName: String
    }
});

module.exports = mongoose.model("Patient", patientSchema); 