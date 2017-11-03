var mongoose = require("mongoose");

var patientSchema = new mongoose.Schema({
    name: String,
    dob: String,
    gender: String,
	type: String,
    breed: String,
    color: String,
    weight: String,
    allergies: String,
    lastVisited: String,
    avatar: String,
    owner:
    {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Owner"
        },
        firstName: String,
        lastName: String
    },
    visit: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Visit"
        }
    ]
});

module.exports = mongoose.model("Patient", patientSchema); 