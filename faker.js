var faker   = require("faker"),
    Patient = require("./models/patients"),
    Owner   = require("./models/owners");
var moment = require("moment");

var ownersArray = [];
var petsArray = [];

var sex = ['Female', 'Male'],
    species = ['Dog', 'Cat'],
    colors = ['Brown', 'Black', 'White', 'Grey', 'Red', 'Tan', 'Multicolored'],
    dogBreed = ['Siberian Husky', 'German Shepherd', 'Corgi', 'Mastiff', 'Poodle', 'Pomeranian', 'Golden Retriever', 'Daschund', 'Pitbull', 'Rottweiler', 'Great Dane', 'Labrador', 'Beagle'],
    catBreed = ['Scottish Fold', 'Siamese', 'Persian', 'Sphynx', 'British Shorthair', 'Ragdoll'];

var randomOwner = function() {
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        phone: faker.phone.phoneNumberFormat(),
        email: faker.internet.email(),
        address: faker.address.streetAddress() + " " + faker.address.city() + " " + faker.address.stateAbbr() + " " + faker.address.zipCode(),
        balance: faker.finance.amount()
    }
}

var randomPet = function() {
    var formattedDob = moment(faker.date.between('2007-01-01', '2017-11-02')).format('YYYY-MM-DD');
    var formattedLastVisited = moment(faker.date.past()).format('YYYY-MM-DD');
    var patientType = species[Math.floor(Math.random()*species.length)];
    var patientBreed = "";
    var petOwner = ownersArray[Math.floor(Math.random()*ownersArray.length)];
    if(patientType === 'Dog'){
        patientBreed = dogBreed[Math.floor(Math.random()*dogBreed.length)]
    } else {
        patientBreed = catBreed[Math.floor(Math.random()*catBreed.length)]
    }
    return {
        name: faker.address.city(),
        dob: formattedDob,
        gender: sex[Math.floor(Math.random()*sex.length)],
        type: patientType,
        breed: patientBreed,
        color: colors[Math.floor(Math.random()*colors.length)],
        weight: faker.random.number({min:5, max:300}),
        lastVisited: formattedLastVisited,
        owner: petOwner
    }
}
   
randomizeOwners();
randomizePets();


function randomizePets(){
    for(var i=0; i<85; i++){
        petsArray.push(randomPet());
    }
}

function randomizeOwners(){
    for(var i=0; i<85; i++){
        ownersArray.push(randomOwner());
    }
}

function ownerSeed(){
    Owner.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed owners");
        ownersArray.forEach(function(randomOwner){
            Owner.create(randomOwner, function(err, owner){
                if(err){
                    console.log(err);
                } else{
                    // console.log("added owners");
                }
            });
        });
    });
}

function patientSeed(){
    Owner.count().exec(function(err, count){
        var randOwner = Math.floor(Math.random()*count)
        Owner.findOne().skip(randOwner).exec(
            function(err, result){
                console.log(result);
            });
    });
    //Remove all patients & owners
    Patient.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed patients");
        petsArray.forEach(function(randomPet){
            Patient.create(randomPet, function(err, patient){
                if(err){
                    console.log(err);
                } else{
                    // console.log(patient);
                    // console.log("added patients");
                }
            });
        });
    });
}

function seedDB(){
    ownerSeed();
    patientSeed();
}

module.exports = seedDB;