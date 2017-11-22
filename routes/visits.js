var express = require("express");
var router = express.Router();
var Patient = require("../models/patients");
var Owner = require("../models/owners");
var Visit = require("../models/visits");

// NEW
router.get("/patients/:id/visits/new", function(req, res){
    Patient.findById(req.params.id, function(err, foundPatient){
        if(err || !foundPatient){
            console.log(err);
        } else {
            res.render("visits/new", {pet: foundPatient});
        }
    });
});

module.exports = router;