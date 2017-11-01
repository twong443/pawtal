var faker   = require("faker"),
    Patient = require("./models/patients"),
    Owner   = require("./models/owners");
// var moment = require("moment");

var sex = ['Female', 'Male'],
    species = ['Dog', 'Cat'],
    dogBreed = ['Husky', 'German Shepherd', 'Corgi', 'Mastiff', 'Poodle', 'Pomeranian'],
    catBreed = ['Scottish Fold', 'Siamese', 'Persian', 'Sphynx'];

var randomPet = {
    name: faker.hacker.adjective(),
    // dob: moment().format('L'),
    sex: sex[Math.floor(Math.random()*sex.length)],
    type: species[Math.floor(Math.random()*species.length)],
    breed: function(){
        if(this.type === 'Dog'){
           return dogBreed[Math.floor(Math.random()*dogBreed.length)]
        } else {
           return catBreed[Math.floor(Math.random()*catBreed.length)]
        }
    },
    color: faker.commerce.color(),
    weight: faker.random.number(),
    avatar: faker.image.animals()
}

var randomOwner = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phone: faker.phone.phoneNumberFormat(),
    email: faker.internet.email(),
    address: faker.address.streetAddress() + " " + faker.address.city() + " " + faker.address.stateAbbr() + " " + faker.address.zipCode(),
    balance: faker.finance.amount()
}

var petsArray = [],
    ownersArray = [];

randomizePets();
randomizeOwners();

function randomizePets(){
    for(i=0; i<11; i++){
        petsArray.push(randomPet);
    }
}

function randomizeOwners(){
    for(i=0; i<11; i++){
        ownersArray.push(randomOwner);
    }
}

function seedDB(){
    //Remove all patients
    Patient.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed patients");
            //add a few pets
        petsArray.forEach(function(seed){
            Patient.create(seed, function(err, patient){
                if(err){
                    console.log(err);
                } else{
                    console.log("added a pet");
                }
            });
        });
        ownersArray.forEach(function(seed){
            Owner.create(seed, function(err, owner){
                if(err){
                    console.log(err);
                } else{
                    console.log("added an owner");
                }
            });
        });
    });
}

module.exports = seedDB;