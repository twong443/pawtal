var faker = require("faker");

var sex = ['Female', 'Male'],
    species = ['Dog', 'Cat'],
    dogBreed = ['Husky', 'German Shepherd', 'Corgi', 'Mastiff', 'Poodle', 'Pomeranian'],
    catBreed = ['Scottish Fold', 'Siamese', 'Persian', 'Sphynx'];

var randomPet = {
    name: faker.commerce.productAdjective(),
    dob: faker.date.past(),
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
    address: faker.address.streetAddress() + " " + faker.address.city() + " " + faker.address.stateAbbr() + " " + faker.address.zipCode()
}

module.exports = {
    randomPet: randomPet,
    randomOwner: randomOwner
}