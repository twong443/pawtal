var express     	= require("express"),
    app         	= express(),
    bodyParser  	= require("body-parser"),
    mongoose    	= require("mongoose"),
    Patient         = require("./models/patients"),
    Owner           = require("./models/owners");

var seedDB = require("./faker");

var port = process.env.PORT || "8080"

var url = process.env.DATABASEURL || "mongodb://localhost/pawtal"
mongoose.connect(url, {useMongoClient: true});
mongoose.Promise = global.Promise; 

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/assets"));
seedDB();

app.get("/", function(req, res){
    res.render("landing");
});

//INDEX ROUTE - show all patients
app.get("/patients", function(req, res){
    Patient.find({}, function(err, allPatients){
        if(err){
            console.log(err);
        } else {
            res.render("patients/index", {pets: allPatients});
        }
    });
});

//NEW ROUTE - add new patient
app.get("/patients/new", function(req, res){
    res.render("patients/new");
});

//CREATE - create new patient
app.post("/patients", function(req, res){
    var name = req.body.name;
    var dob = req.body.dob;
    var gender = req.body.gender;
    var type = req.body.type;
    var breed = req.body.breed;
    var color = req.body.color;
    var weight = req.body.weight;
    var avatar = req.body.avatar;
    // var owner = {
    //     id: req.owner._id,
    //     username: req.owner.username
    // }
    var newPatient = {
        name: name,
        dob: dob,
        gender: gender,
        type: type,
        breed: breed,
        color: color,
        weight: weight,
        avatar: avatar
        // owner: owner
    }
    Patient.create(newPatient, function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect("/patients");
        }
    });
});

//SHOW
app.get("/patients/:id", function(req, res){
    Patient.findById(req.params.id, function(err, foundPatient){
        if(err || !foundPatient){
            console.log(err);
        } else {
            res.render("patients/show", {pet:foundPatient});
        }
    });
});

app.listen(port, process.env.IP, function(){
    console.log("Pawtal Server Has Started");
});