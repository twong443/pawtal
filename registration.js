var owner = {};
var patient = {};

var reset = function(){
    owner = {},
    patient = {}
}

var addAppt = function(req, res){
    if(req.body.appointment !== undefined){
        res.redirect("/appointments/new");
    } else {
        reset();
        res.redirect("/patients");
    }
}

module.exports = {
    owner: owner,
    patient: patient,
    reset: reset,
    addAppt: addAppt
};