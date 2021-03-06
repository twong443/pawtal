var express = require("express");
var router = express.Router();
var states = require("datasets-us-states-names");
var countries = require("country-list")();
var multer = require("../multer");
var async = require("async");
var Patient = require("../models/patients");
var Owner = require("../models/owners");
var Appt = require("../models/appointments");
var Visit = require("../models/visits");

// INDEX
router.get("/", function(req, res){
    Owner.find({}, function(err, allOwners){
        if(err){
            console.log(err);
        } else {
            res.render("owners/index", {owners: allOwners});
        }
    });
});

// SHOW
router.get("/:id", function(req, res){
    Owner.findById(req.params.id, function(err, foundOwner){
        if(err || !foundOwner){
            console.log(err);
            res.redirect("/owners");
        } else {
            Patient.find({'owner.id': foundOwner._id}, function(err, foundPatients){
                if(err){
                    console.log(err);
                    res.redirect("/owners");
                } else {
                    Appt.find({'patient.id': {$in: foundPatients._id}}, function(err, foundAppts){
                        if(err){
                            console.log(err);
                            res.redirect("/owners");
                        }
                        res.render("owners/show", {owner: foundOwner, pets: foundPatients});                                    
                    });
                }
            });
        }
    });
});

// EDIT
router.get("/:id/edit", function(req, res){
    var countriesArr = countries.getNames();
    Owner.findById(req.params.id, function(err, foundOwner){
        if(err || !foundOwner){
            console.log(err);
            res.redirect("/owners");
        } else {
            res.render("owners/edit", {owner: foundOwner, states: states, countries: countriesArr});
        }
    });
});

// UPDATE
router.put("/:id", function(req, res){
    Owner.findByIdAndUpdate(req.params.id, req.body.owner, function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect("/owners/" + req.params.id);
        }
    });
});

//DESTROY
router.delete("/:id", function(req, res){
	Owner.findById(req.params.id, function(err, foundOwner){
        if(err){
            res.redirect("back");
        } else {
            Patient.find({'owner.id': foundOwner._id}, function(err, foundPatients){
                if(err){
                    console.log(err);
                    res.redirect("back");
                } else {
                    foundPatients.forEach(function(foundPatient){
                        if (foundPatient.avatar && foundPatient.avatar.length > 0) {
                            multer.destroyFromCloudinary(foundPatient.avatar);
                        }
                        Appt.find({'patient.id': foundPatient._id}, function(err, foundAppts){
                            if(err){
                                console.log(err);
                                res.redirect("back");
                            } else {
                                foundAppts.forEach(function(foundAppt){
                                    foundAppt.remove();                                    
                                });
                            }
                        });
                        Visit.find({'patient.id': foundPatient._id}, function(err, foundVisits){
                            if(err){
                                console.log(err);
                                res.redirect("back");
                            } else {
                                foundVisits.forEach(function(foundVisit){
                                    foundVisit.remove();                                    
                                });
                            }
                        });
                        foundPatient.remove();
                    });
                }
            });
            foundOwner.remove();
            res.redirect("/owners");
        }
    });
});

module.exports = router;