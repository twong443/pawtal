var express = require("express");
var router = express.Router();
var states = require("datasets-us-states-names");
var countries = require("country-list")();
var Patient = require("../models/patients");
var Owner = require("../models/owners");
var Appt = require("../models/appointments");
var register = require("../registration");

// NEW ROUTE
router.get("/register", function(req, res){
    var countriesArr = countries.getNames(); 
    Owner.find({}, function(err, allOwners){
        if(err){
            console.log(err);
        } else {
            res.render("register/owner", {owners: allOwners, states: states, countries: countriesArr});
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
    res.redirect("/register/patient");
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
    res.redirect("/register/confirm");
});

//CREATE - create new patient
router.post("/patients", function(req, res){   
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

module.exports = router;