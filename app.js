var express     	= require("express"),
    app         	= express(),
    bodyParser  	= require("body-parser"),
    mongoose    	= require("mongoose"),
    Patient         = require("./models/patients"),
    Owner           = require("./models/owners"),
    Visit           = require("./models/visits"),
    seedDB          = require("./faker");

var patientRoutes   = require("./routes/patients");

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

app.use("/patients", patientRoutes);

function escapeRegex(text) {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

app.listen(port, process.env.IP, function(){
    console.log("Pawtal Server Has Started");
});