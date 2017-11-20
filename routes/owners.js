var express = require("express");
var router = express.Router();
var states = require("datasets-us-states-names");
var countries = require("country-list")();
var Patient = require("../models/patients");
var Owner = require("../models/owners");
var Appt = require("../models/appointments");

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
            res.render("owners/show", {owner: foundOwner});
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
	Owner.findByIdAndRemove(req.params.id, function(err, foundOwner){
        if(err){
            res.redirect("back");
        } else {
            Appt.find({'patient.id': foundPatient._id}).remove(function(err){
                if(err){
                    console.log(err);
                } else {
                    res.redirect("/patients");                    
                }
            });
        }
    });
});

module.exports = router;