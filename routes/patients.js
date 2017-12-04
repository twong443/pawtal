var express = require("express");
var router = express.Router();
var states = require("datasets-us-states-names");
var countries = require("country-list")();
var multer = require("../multer");
var url = require("url");
var Patient = require("../models/patients");
var Owner = require("../models/owners");
var Appt = require("../models/appointments");

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

//SHOW
router.get("/:id", function(req, res){
    Patient.findById(req.params.id, function(err, foundPatient){
        if(err || !foundPatient){
            console.log(err);
            res.redirect("/");
        }
        Owner.findById(foundPatient.owner.id, function(err, foundOwner){
            if(err || !foundOwner){
                console.log(err);
                res.redirect("/");
            }
            res.render("patients/show", {pet:foundPatient, owner: foundOwner});
        });
    });
});

// EDIT
router.get("/:id/edit", function(req, res){
    Patient.findById(req.params.id, function(err, foundPatient){
        if(err || !foundPatient){
            console.log(err);
            res.redirect("/");
        } else {
            res.render("patients/edit", {pet: foundPatient});
        }
    });
});

// UPDATE
router.put("/:id", multer.upload.single("avatar"), function(req, res){
    if(req.file === undefined){
        Patient.findByIdAndUpdate(req.params.id, req.body.pet, function(err, updatedPatient){
            if(err){
                console.log(err);
            } else {
                res.redirect("/patients/" + req.params.id);
            }
        });
    } else {
        Patient.findById(req.params.id, function(err, foundPatient){
            if(err || !foundPatient){
                console.log(err);
            } else if (foundPatient.avatar && foundPatient.avatar.length > 0) {
                multer.destroyFromCloudinary(foundPatient.avatar);
            } 
            multer.cloudinary.uploader.upload(req.file.path, function(result){
                req.body.pet.avatar = result.secure_url;
                foundPatient.set(req.body.pet);
                foundPatient.save(function(err){
                    if(err){
                        console.log(err);
                    } else {
                        res.redirect("/patients/" + req.params.id);
                    }
                })
            });
        });
    }    
});

//DESTROY
router.delete("/:id", function(req, res){
	Patient.findByIdAndRemove(req.params.id, function(err, foundPatient){
        if(err){
            res.redirect("back");
        } else if (foundPatient.avatar && foundPatient.avatar.length > 0) {
            multer.destroyFromCloudinary(foundPatient.avatar);
        } 
        Appt.find({'patient.id': foundPatient._id}).remove(function(err){
            if(err){
                console.log(err);
            } else {
                res.redirect("/patients");                    
            }
        });
    });
});

module.exports = router;