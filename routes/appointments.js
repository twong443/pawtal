var express = require("express");
var router = express.Router();
var Patient = require("../models/patients");
var Owner = require("../models/owners");
var Appt = require("../models/appointments");

// READ ALL
router.get("/appointments", function(req, res){
    Appt.find({}, function(err, allAppts){
        if(err){
            console.log(err);
            res.redirect(back);
        } else {
            res.render("appointments/index", {appts: allAppts});
            console.log(allAppts);
        }
    });
});

// NEW
router.get("/appointments/new", function(req, res){
    res.render("appointments/new");
});

// CREATE
router.post("/appointments", function(req, res){
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
        patient: patient
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

// UPDATE
router.get("/appointments/:id/edit", function(req, res){
	Appt.findById(req.params.id, function(err, foundAppt){
		res.render("appointments/edit", {appt: foundAppt});
	});
});

module.exports = router;