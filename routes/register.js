var express = require("express");
var router = express.Router();
var states = require("datasets-us-states-names");
var countries = require("country-list")();
var register = require("../registration");
var multer = require("../multer");
var Patient = require("../models/patients");
var Owner = require("../models/owners");
var Appt = require("../models/appointments");

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
    if(req.body.existingOwner.length > 0){
        register.owner = JSON.parse(req.body.existingOwner);
    } else {
        //new owner properties
        register.owner = req.body.owner;  
        register.owner.address = req.body.address; 
    }
    res.redirect("/register/patient");
});

router.post("/register/confirm", multer.upload.single("avatar"), function(req, res){
    if(req.file === undefined){
        register.patient = req.body.pet;  
        res.redirect("/register/confirm");
    } else {
        multer.cloudinary.uploader.upload(req.file.path, function(result){
            var croppedAvatar = multer.cropImage(result.secure_url);
            req.body.pet.avatar = croppedAvatar;
            register.patient = req.body.pet;  
            res.redirect("/register/confirm");
        });
    }
});

//CREATE - create new patient
router.post("/patients", function(req, res){
    if(register.owner._id) {
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