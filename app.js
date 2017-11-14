var express     	= require("express"),
    app         	= express(),
    bodyParser  	= require("body-parser"),
    mongoose    	= require("mongoose"),
    request         = require("request");
    Patient         = require("./models/patients"),
    Owner           = require("./models/owners"),
    Visit           = require("./models/visits"),
    seedDB          = require("./faker");

var patientRoutes   = require("./routes/patients");
var visitRoutes   = require("./routes/visits");

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

app.get("/allOwnerNames", function(req, res){
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

app.get("/alldogbreeds", function(req, res){
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

app.use("/patients", patientRoutes);
app.use(visitRoutes);

app.listen(port, process.env.IP, function(){
    console.log("Pawtal Server Has Started");
});