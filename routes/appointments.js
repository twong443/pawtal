var express = require("express");
var router = express.Router();
var Patient = require("../models/patients");
var Owner = require("../models/owners");

router.get("/appointments", function(req, res){
    res.render("appointments/index");
});

router.get("/appointments/new", function(req, res){
    res.render("appointments/new");
});

module.exports = router;