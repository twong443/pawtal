var express = require("express");
var router = express.Router();
var moment = require("moment");
var Patient = require("../models/patients");
var Owner = require("../models/owners");
var Appt = require("../models/appointments");

var today = new Date();

// READ ALL & SHOW
router.get("/", function(req, res){
    Appt.find({date : {$gte: today}}, null, {sort: {"date": 1, "time": 1}}, function(err, allAppts){
        if(err){
            console.log(err);
            res.redirect(back);
        } else {
            res.render("appointments/index", {appts: allAppts, today: today});            
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
    req.body.appt.patient = {
        id: parsePatient._id,
        name: parsePatient.name,
        avatar: parsePatient.avatar
    }
    if(new Date(req.body.appt.date) < new Date()){
        console.log("You can't make appointments in the past");
        res.redirect("back");
    } else {
        Appt.create(req.body.appt, function(err){
            if(err){
                console.log(err);
                res.redirect(back);
            } else {
                res.redirect("/appointments");
            }
        });
    }
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

// function getTodayDate(){
//     var today = new Date();
//     var dd = today.getDate();
//     var mm = today.getMonth()+1; //January is 0!
//     var yyyy = today.getFullYear();
    
//     if(dd<10) {
//         dd = '0'+dd
//     } 
    
//     if(mm<10) {
//         mm = '0'+mm
//     } 
    
//     return today = mm + "-" + dd + "-" + yyyy;
// }


module.exports = router;