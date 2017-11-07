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
    //patient properties
    var name = req.body.name;
    var dob = req.body.dob;
    var gender = req.body.gender;
    var type = req.body.type;
    var breed = req.body.breed;
    var color = req.body.color;
    var weight = req.body.weight;
    var avatar = req.body.avatar;
    //existing owner properties
    var owner = null, parseOwner = { };
    if(req.body.owner.length > 0){
        parseOwner = JSON.parse(req.body.owner);
        owner = {
            id: parseOwner._id,
            firstName: parseOwner.firstName,
            lastName: parseOwner.lastName
        };
    }
    //new owner properties
    var firstName = req.body.firstName,
        lastName = req.body.lastName,
        phone = req.body.phone,
        email = req.body.email,        
        streetAddress = req.body.streetAddress,
        secondAddress = req.body.secondAddress,
        city = req.body.city,
        state = req.body.state,
        zipCode = req.body.zipCode,
        country = req.body.country;

    var newOwner = {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
        address: {
            street: streetAddress,
            secondAddress: secondAddress,
            city: city,
            state: state,
            zipCode: zipCode,
            country: country
        }
    };
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
    if(owner != null) {
        console.log("owner exists");
        Patient.create(newPatient, function(err){
            if(err){
                console.log(err);
            } else {
                res.redirect("/patients");
            }
        });
    } else {
        Owner.create(newOwner, function(err, owner){
            if(err){
                console.log(err);
                res.redirect("back");
            } 
            // console.log(owner);
            newPatient.owner = {
                id: owner._id,
                firstName: owner.firstName,
                lastName: owner.lastName
            };
            Patient.create(newPatient, function(err){
                if(err){
                    console.log(err);
                } else {
                    res.redirect("/patients");
                }
            });
        });
    }
});

//SHOW
router.get("/:id", function(req,res){
    Patient.findById(req.params.id, function(err, foundPatient){
        if(err || !foundPatient){
            console.log(err);
            res.redirect("/");
        }
        Owner.findById(foundPatient.owner.id, function(err, foundOwner){
            if(err || !foundOwner){
                console.log(err);
            }
            console.log(foundOwner);
            res.render("patients/show", {pet:foundPatient, owner: foundOwner});
        });
    });
});

module.exports = router;