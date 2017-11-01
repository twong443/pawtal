var express     	= require("express"),
    app         	= express(),
    bodyParser  	= require("body-parser"),
    mongoose    	= require("mongoose");

var faker     = require("./faker"),
    randomPet = faker.randomPet,
    randomBreed = randomPet.breed(),
    randomOwner = faker.randomOwner;

var port = process.env.PORT || "8080"

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/patients", function(req, res){
    console.log(randomOwner);
    res.render("patients/index");
});

app.listen(port, process.env.IP, function(){
    console.log("Pawtal Server Has Started");
});