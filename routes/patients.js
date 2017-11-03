var express = require("express");
var router = express.Router();
var Patient = require("../models/patients");
var Owner = require("../models/owners");

//INDEX ROUTE - show all patients
router.get("/", function(req, res){
    Patient.find({}, function(err, allPatients){
        Owner.find({}, function(err, allOwners){
            if(err){
                console.log(err);
            } else {
                res.render("patients/index", {pets: allPatients, owners: allOwners});
            }
        });
    });
});

//NEW ROUTE - add new patient
router.get("/new", function(req, res){
    Owner.find({}, function(err, allOwners){
        if(err){
            console.log(err);
        } else {
            res.render("patients/new", {owners: allOwners});
        }
    });    
});

//CREATE - create new patient
router.post("/", function(req, res){
    var name = req.body.name;
    var dob = req.body.dob;
    var gender = req.body.gender;
    var type = req.body.type;
    var breed = req.body.breed;
    var color = req.body.color;
    var weight = req.body.weight;
    var avatar = req.body.avatar;
    var owner = req.body.owner;
    var newPatient = {
        name: name,
        dob: dob,
        gender: gender,
        type: type,
        breed: breed,
        color: color,
        weight: weight,
        avatar: avatar,
        owner: owner
    }
    Patient.create(newPatient, function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect("/patients");
        }
    });
});

//SHOW
router.get("/:id", function(req, res){
    Patient.findById(req.params.id, function(err, foundPatient){
        if(err || !foundPatient){
            console.log(err);
        } else {
            res.render("patients/show", {pet:foundPatient});
        }
    });
});

module.exports = router;