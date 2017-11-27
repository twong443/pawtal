var express = require("express");
var router = express.Router();
var Patient = require("../models/patients");
var Owner = require("../models/owners");

router.get("/allOwnerNames", function(req, res){
    Owner.find({}, function(err, allOwners){
        if(err){
            console.log(err);
        }
        var modifiedOwners = [];
        allOwners.forEach(function(owner){
            var mod = {
                "name" : owner.firstName + " " + owner.lastName + " || " + owner.phone,
                "owner" : owner
            };
            modifiedOwners.push(mod);
        });
        res.send(modifiedOwners);
    });
});

router.get("/allPetNames", function(req, res){
    Patient.find({}, function(err, allPatients){
        if(err){
            console.log(err);
        }
        var modifiedPatients = [];
        allPatients.forEach(function(pet){
            var mod = {
                "name" : pet.name + " || " + pet.owner.firstName + " " + pet.owner.lastName,
                "pet" : pet
            };
            modifiedPatients.push(mod);
        });
        res.send(modifiedPatients);
    });
});

router.get("/alldogbreeds", function(req, res){
    request("https://dog.ceo/api/breeds/list", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            var breeds = [];
            info.message.forEach(function(breed){
                breeds.push({name: breed});
            });
            res.send(breeds);
        }
    });
});

module.exports = router;