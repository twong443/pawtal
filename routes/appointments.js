var express = require("express");
var router = express.Router();
var Patient = require("../models/patients");
var Owner = require("../models/owners");
var Appt = require("../models/appointments");

// READ ALL & SHOW
router.get("/", function(req, res){
    Appt.find({}, function(err, allAppts){
        if(err){
            console.log(err);
            res.redirect(back);
        } else {
            res.render("appointments/index", {appts: allAppts});
        }
    });
});

// NEW
router.get("/new", function(req, res){
    res.render("appointments/new");
});

// CREATE
router.post("/", function(req, res){
    var parsePatient = JSON.parse(req.body.pet);
    var date = req.body.date,
        time = req.body.time,
        reason = req.body.reason,
        notes = req.body.notes,
        patient = parsePatient;
    var newAppt = {
        date: date,
        time: time,
        reason: reason,
        notes: notes,
        patient: {
            id: patient._id,
            name: patient.name
        }
    }
    Appt.create(newAppt, function(err){
        if(err){
            console.log(err);
            res.redirect(back);
        } else {
            res.redirect("/appointments");
        }
    });
});

// SHOW
router.get("/:id", function(req, res){
    Appt.findById(req.params.id, function(err, foundAppt){
        if(err){
            console.log(err);
            res.redirect(back);
        } else {
            Patient.findById(foundAppt.patient.id, function(err, foundPatient){
                res.render("appointments/show", {appt: foundAppt, pet: foundPatient})
            });
        }
    });
});

// EDIT
router.get("/:id/edit", function(req, res){
	Appt.findById(req.params.id, function(err, foundAppt){
        if(err){
            console.log(err);
        } else {
            res.render("appointments/edit", {appt: foundAppt});
        }        
	});
});

// UPDATE
router.put("/:id", function(req, res){
    Appt.findByIdAndUpdate(req.params.id, req.body.appt, function(err, updatedAppt){
        if(err){
            console.log(err);
            res.redirect("back");
        } else{
            res.redirect("/appointments");
        }
    });
});

//DELETE
router.delete("/:id", function(req, res){
	Appt.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/appointments");
        }
    });
});

module.exports = router;