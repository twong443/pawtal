var express = require("express");
var router = express.Router();
var states = require("datasets-us-states-names");
var countries = require("country-list")();
// var dataUri = require("datauri");
var Patient = require("../models/patients");
var Owner = require("../models/owners");
var Appt = require("../models/appointments");
var register = require("../registration");
//configure multer for image upload
var multer = require("multer");
//configure cloudinary
var cloudinary = require("cloudinary");
cloudinary.config({ 
    cloud_name: "pawtal", 
    api_key: "264442116924278", 
    api_secret: process.env.CLOUDINARY_API_SECRET
});
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./tmp/avatars")
    },
    filename: function(req, file, callback) {
        callback(null, Date.now() + file.originalname);
    }
});
// var memStorage = multer.memoryStorage();
// var imageFilter = function (req, file, cb) {
//     // accept image files only
//     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
//         return cb(new Error("Only image files are allowed!"), false);
//     }
//     cb(null, true);
// };
var upload = multer({ storage: storage }); //fileFilter: imageFilter

// NEW ROUTE
router.get("/register", function(req, res){
    var countriesArr = countries.getNames(); 
    Owner.find({}, function(err, allOwners){
        if(err){
            console.log(err);
        } else {
            res.render("register/owner", {owners: allOwners, states: states, countries: countriesArr});
        }
    }); 
});

router.get("/register/patient", function(req,res){
    res.render("register/patient");
});

router.get("/register/confirm", function(req,res){
    res.render("register/confirm", {register: register});
});

router.post("/register/patient", function(req, res){
    // existing owner properties
    if(req.body.owner.length > 0){
        register.owner = JSON.parse(req.body.owner);
    } else {
        //new owner properties
        var firstName = req.body.firstName,
            lastName = req.body.lastName,
            phone = req.body.phone,
            email = req.body.email,        
            streetAddress = req.body.streetAddress,
            secondAddress = req.body.secondAddress,
            city = req.body.city,
            state = req.body.state,
            zipCode = req.body.zipCode,
            country = req.body.country;

        var newOwner = {
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            email: email,
            address: {
                street: streetAddress,
                secondAddress: secondAddress,
                city: city,
                state: state,
                zipCode: zipCode,
                country: country
            }
        };
        register.owner = newOwner;
    }
    res.redirect("/register/patient");
});

router.post("/register/confirm", upload.single("avatar"), function(req, res){
    console.log(req.file.path);
    cloudinary.uploader.upload(req.file.path, function(result){
        req.body.pet.avatar = result.secure_url;
        register.patient = req.body.pet;  
        res.redirect("/register/confirm");
    });
});

//CREATE - create new patient
router.post("/patients", function(req, res){
    if(register.owner._id) {
        register.patient.owner = {
            id: register.owner._id,
            firstName: register.owner.firstName,
            lastName: register.owner.lastName
        };
        Patient.create(register.patient, function(err){
            if(err){
                console.log(err);
                register.reset();
            } else {
                register.addAppt(req, res);    
            }
        });
    } else {
        Owner.create(register.owner, function(err, owner){
            if(err){
                console.log(err);
                register.reset();   
                res.redirect("back");
            } 
            register.patient.owner = {
                id: owner._id,
                firstName: owner.firstName,
                lastName: owner.lastName
            };
            Patient.create(register.patient, function(err){
                if(err){
                    console.log(err);
                    register.reset();   
                } else {
                    register.addAppt(req, res);    
                }
            });
        });
    }
});

module.exports = router;