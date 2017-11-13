var owner = {};
var patient = {};

var reset = function(){
    owner = {},
    patient = {}
}

module.exports = {
    owner: owner,
    patient: patient,
    reset: reset
};