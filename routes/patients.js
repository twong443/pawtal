var express = require("express");
var router = express.Router();
// var request = require("request");
var Patient = require("../models/patients");
var Owner = require("../models/owners");
var register = require("./registration");

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

// NEW ROUTE
router.get("/register", function(req, res){
    Owner.find({}, function(err, allOwners){
        if(err){
            console.log(err);
        } else {
            res.render("register/owner", {owners: allOwners});
        }
    }); 
});

router.get("/register/patient", function(req,res){
    res.render("register/patient");
});

router.get("/register/confirm", function(req,res){
    res.render("register/confirm", {register: register});
});

router.post("/register/patient", function(req, res){
    // existing owner properties
    if(req.body.owner.length > 0){
        register.owner = JSON.parse(req.body.owner);
    } else {
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
        register.owner = newOwner;
    }
    res.redirect("/patients/register/patient");
});

router.post("/register/confirm", function(req, res){
    //patient properties
    var name = req.body.name,
        dob = req.body.dob,
        gender = req.body.gender,
        type = req.body.type,
        breed = req.body.breed,
        color = req.body.color,
        weight = req.body.weight,
        avatar = req.body.avatar;
    var newPatient = {
        name: name,
        dob: dob,
        gender: gender,
        type: type,
        breed: breed,
        color: color,
        weight: weight,
        avatar: avatar,
        owner: register.owner
    }
    register.patient = newPatient;  
    res.redirect("/patients/register/confirm");
});

//CREATE - create new patient
router.post("/", function(req, res){   
    if(register.owner._id) {
        // console.log("owner exists");
        register.patient.owner = {
            id: register.owner._id,
            firstName: register.owner.firstName,
            lastName: register.owner.lastName
        };
        Patient.create(register.patient, function(err){
            if(err){
                console.log(err);
                register.reset();
            } else {
                register.addAppt(req, res);    
            }
        });
    } else {
        Owner.create(register.owner, function(err, owner){
            if(err){
                console.log(err);
                register.reset();   
                res.redirect("back");
            } 
            register.patient.owner = {
                id: owner._id,
                firstName: owner.firstName,
                lastName: owner.lastName
            };
            Patient.create(register.patient, function(err){
                if(err){
                    console.log(err);
                    register.reset();   
                } else {
                    register.addAppt(req, res);    
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
            res.render("patients/show", {pet:foundPatient, owner: foundOwner});
        });
    });
});

//UPDATE

//DESTROY

module.exports = router;