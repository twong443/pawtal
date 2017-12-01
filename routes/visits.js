var express = require("express");
var router = express.Router({mergeParams: true}); //need mergeParams to access ":id" from app.js
var Patient = require("../models/patients");
var Owner = require("../models/owners");
var Visit = require("../models/visits");

router.get("/visits", function(req, res){
    res.send("visit route");
});

// RENDER LIST OF VISITS FOR ONE PATIENT
router.get("/patients/:id/visits", function(req, res){
    Patient.findById(req.params.id, function(err, foundPatient){
        if(err || !foundPatient){
            console.log(err);
        } else {
            Visit.find({'patient.id': foundPatient._id}, function(err, foundVisits){
                if(err){
                    console.log(err);
                } else {
                    res.render("visits/index", {visits: foundVisits, pet: foundPatient});   
                }                             
            });
        }
    });
});

// NEW
router.get("/patients/:id/visits/new", function(req, res){
    Patient.findById(req.params.id, function(err, foundPatient){
        if(err || !foundPatient){
            console.log(err);
        } else {
            res.render("visits/new", {pet: foundPatient});
        }
    });
});

// SHOW VISIT DETAILS
router.get("/patients/:id/visits/:visit_id", function(req, res){
    Patient.findById(req.params.id, function(err, foundPatient){
        if(err || !foundPatient){
            console.log(err);
            res.redirect("back");
        } else {
            Visit.findById(req.params.visit_id).populate("orders").exec(function(err, foundVisit){
                if(err || !foundVisit){
                    console.log(err);
                    res.redirect("back");
                } else {
                    res.render("visits/show", {visit: foundVisit, pet: foundPatient});
                }
            });
        }
    });
});

// CREATE
router.post("/patients/:id", function(req, res){
    Patient.findById(req.params.id, function(err, foundPatient){
        var date = req.body.date,
            time = req.body.time,
            reason = req.body.reason,
            weight = req.body.weight,
            orders = req.body.orders,
            diagnosis = req.body.diagnosis,
            notes = req.body.notes;
        var parseOrders = [];
        var costArr = [];
        var totalCostOfOrders = 0;
        if (orders && orders != undefined){
            orders.forEach(function(order){          
                parseOrders.push(JSON.parse(order));
            });
            parseOrders.forEach(function(order){
                costArr.push(order.cost);            
            });
            totalCostOfOrders = costArr.reduce(add, 0);  
        }
        var newVisit = {
            date: date,
            time: time,
            reason: reason,
            weight: weight,
            orders: parseOrders,
            diagnosis: diagnosis,
            notes: notes,
            totalCost: totalCostOfOrders,
            patient: {
                id: foundPatient._id,
                name: foundPatient.name
            }
        }
        Visit.create(newVisit, function(err, visit){
            if(err){
                console.log(err);
                res.redirect("back");
            } else {
                if (visit.weight && visit.weight.length > 0){
                    foundPatient.weight = visit.weight;                 
                } 
                foundPatient.lastVisited = visit.date;
                foundPatient.save(function(err){
                    if(err){
                        console.log(err);
                    } else {
                        res.redirect("/patients/" + foundPatient._id);                        
                    }
                });
            }
        });
    });
});

//EDIT
router.get("/patients/:id/visits/:visit_id/edit", function(req, res){
    Visit.findById(req.params.visit_id).populate("orders").exec(function(err, foundVisit){
        if(err || !foundVisit){
            console.log(err);
            res.redirect("/");
        } else {
            res.render("visits/edit", {visit: foundVisit});
        }
    }); 
});

// UPDATE
router.put("/patients/:id/visits/:visit_id", function(req, res){
    Visit.findById(req.params.visit_id, function(err, foundVisit){
        if(err){
            console.log(err);
        } else {
            var orders = req.body.orders;
            var totalCostOfOrders = 0;
            var parseOrders = [];
            var costArr = [];
            if (orders && orders != undefined){
                orders.forEach(function(order){          
                    parseOrders.push(JSON.parse(order));
                });
                parseOrders.forEach(function(order){
                    costArr.push(order.cost);            
                });
                totalCostOfOrders = costArr.reduce(add, 0);  
            }
            foundVisit.orders= parseOrders;
            foundVisit.totalCost= totalCostOfOrders;
            foundVisit.save();
        }
    });
    Visit.findByIdAndUpdate(req.params.visit_id, req.body.visit, function(err, updatedVisit){
        if(err){
            console.log(err);
        } else {
            res.redirect("/patients/" + req.params.id + "/visits/" + updatedVisit._id);
        }
    });
});

//DESTROY
router.delete("/patients/:id/visits/:visit_id", function(req, res){
    Visit.findByIdAndRemove(req.params.visit_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/patients/" + req.params.id);                    
        }
    });       
});

function add(a, b){
    return a + b;
}

module.exports = router;