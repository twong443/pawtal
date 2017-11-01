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
seedDB();

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/patients", function(req, res){
    Patient.find({}, function(err, allPatients){
        if(err){
            console.log(err);
        } else {
            res.render("patients/index", {pets: allPatients});
        }
    });
});

app.listen(port, process.env.IP, function(){
    console.log("Pawtal Server Has Started");
});