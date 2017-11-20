var faker   = require("faker"),
    request = require("request"),
    sr = require("sync-request"),   
    petNames = require("dog-names"), 
    Patient = require("./models/patients"),
    Owner   = require("./models/owners");
var moment = require("moment");

var sex = ['Female', 'Male'],
    species = ['Dog', 'Cat'],
    colors = ['Brown', 'Black', 'White', 'Grey', 'Red', 'Tan', 'Multicolored'],
    dogBreed = getBreeds(),
    catBreed = ['Scottish Fold', 'Siamese', 'Persian', 'Sphynx', 'British Shorthair', 'Ragdoll'];

var randomOwner = function() {
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        phone: faker.phone.phoneNumberFormat(),
        email: faker.internet.email(),
        address: {
            street: faker.address.streetAddress(),
            secondAddress: faker.address.secondaryAddress(),            
            city: faker.address.city(),
            state: faker.address.state(),
            zipCode: faker.address.zipCode(),
            country: faker.address.country()
        },
        balance: faker.finance.amount()
    }
}

var randomPet = function(ownerId, ownerFirstName, ownerLastName) {
    var formattedDob = moment(faker.date.between('2007-01-01', '2017-11-02')).format('YYYY-MM-DD');
    var formattedLastVisited = moment(faker.date.past()).format('YYYY-MM-DD');
    var patientType = species[Math.floor(Math.random()*species.length)];
    var patientBreed = "";
    var avatar = getAvatar();
    var petOwner = {
        id: ownerId,
        firstName: ownerFirstName,
        lastName: ownerLastName
    }
    if(patientType === 'Dog'){
        patientBreed = dogBreed[Math.floor(Math.random()*dogBreed.length)]
    } else {
        patientBreed = catBreed[Math.floor(Math.random()*catBreed.length)]
    }
    return {
        name: petNames.allRandom(),
        dob: formattedDob,
        gender: sex[Math.floor(Math.random()*sex.length)],
        type: patientType,
        breed: patientBreed,
        color: colors[Math.floor(Math.random()*colors.length)],
        weight: faker.random.number({min:5, max:300}),
        lastVisited: formattedLastVisited,
        owner: petOwner,
        avatar: avatar
    }
}

function getBreeds(){
    var res = sr('GET', "https://dog.ceo/api/breeds/list");
    var breed = JSON.parse(res.body);
    return breed.message;
}

function getAvatar(){
    var res = sr('GET', "https://dog.ceo/api/breeds/image/random");
    var avatar = JSON.parse(res.body);
    return avatar.message;
}

function seedDB(){
    Owner.remove({}, function(err){
        if(err){
            console.log(err);
        }
        // console.log("removed owners");
        Patient.remove({}, function(err){
            if(err){
                console.log(err);
            }
            for(var i=0; i<25; i++){
                Owner.create(randomOwner(), function(err, owner){
                    if(err){
                        console.log(err);
                    } else{
                        // console.log("added owners");
                        var pet = randomPet(owner.id, owner.firstName, owner.lastName);
                        Patient.create(pet, function(err, patient){
                            if(err){
                                console.log(err);
                            } else{
                                // console.log(patient);
                            }
                        });
                    }
                });
            }
        });
    });
}

module.exports = seedDB;