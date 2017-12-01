var express = require("express");
var router = express.Router();
var request = require("request");
var Patient = require("../models/patients");
var Owner = require("../models/owners");
var Order = require("../models/orderCatalog");

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

router.get("/allOrders", function(req, res){
    Order.find({}, function(err, allOrders){
        if(err){
            console.log(err);
        }
        var modifiedOrders = [];
        allOrders.forEach(function(order){
            var mod = {
                "name" : order.name + " || " + order.type,
                "order" : order
            };
            modifiedOrders.push(mod);
        });
        res.send(modifiedOrders);
    });
});

router.get("/alldogbreeds", function(req, res){
    request("https://dog.ceo/api/breeds/list", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            var breeds = [];
            info.message.forEach(function(breed){
                var initCapBreeds = titleCase(breed);
                breeds.push({name: initCapBreeds});
            });
            res.send(breeds);
        }
    });
});

function titleCase(str) {
    return str.replace(str[0], str[0].toUpperCase());
}

module.exports = router;