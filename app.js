var express     	= require("express"),
    app         	= express(),
    bodyParser  	= require("body-parser"),
    mongoose    	= require("mongoose"),
    methodOverride 	= require("method-override"),   
    dotenv          = require("dotenv").config(),
    faker           = require("./faker");

var apiRoutes       = require("./routes/api"),
    patientRoutes   = require("./routes/patients"),
    ownerRoutes     = require("./routes/owners"),
    registerRoutes  = require("./routes/register"),
    visitRoutes     = require("./routes/visits"),
    apptRoutes      = require("./routes/appointments");
    
var port = process.env.PORT || "8080"

var url = process.env.DATABASEURL || "mongodb://localhost/pawtal"
mongoose.connect(url, {useMongoClient: true});
mongoose.Promise = global.Promise; 

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.locals.moment = require("moment"); // Now moment is available for use in all of view files via the variable named moment
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/assets"));
// faker.seedDB();
// faker.seedOrders();

app.get("/", function(req, res){
    res.render("landing");
});

app.use(apiRoutes);
app.use(registerRoutes);
app.use("/patients", patientRoutes);
app.use("/owners", ownerRoutes);
app.use(visitRoutes);
app.use("/appointments", apptRoutes);

app.listen(port, process.env.IP, function(){
    console.log("Pawtal Server Has Started");
});