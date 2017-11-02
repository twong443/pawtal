var mongoose = require("mongoose");

var patientSchema = new mongoose.Schema({
    name: String,
    dob: String,
    gender: String,
	type: String,
    breed: String,
    color: String,
    weight: String,
    lastVisited: String,
    avatar: String,
    owner: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Owner"
        },
        username: String
    }
});

module.exports = mongoose.model("Patient", patientSchema); 