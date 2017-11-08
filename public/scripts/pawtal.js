//make rows into links
var rowUrls = document.querySelectorAll(".rowUrl");

rowUrls.forEach(function(row){
    var petId = row.attributes[1].textContent;
    row.addEventListener("click", function(){
        // alert(petId);
        window.location.assign("/patients/" + petId);
    });
});

// Autocomplete Owner Names
var ownerOptions = {
	url: function(phrase) {
		return "/allOwnerNames";
	},
    getValue: "name",
    list: {
        onSelectItemEvent: function() {
            var ownerObject = $("#ownersDb").getSelectedItemData().owner;
            $("#owner-data").val(JSON.stringify(ownerObject)).trigger("change");
        },
        match: {
            enabled: true
        }
    }
};

$("#ownersDb").easyAutocomplete(ownerOptions);

// Dog Breeds from API
var breedOptions = {
	url: function(phrase) {
		return "/alldogbreeds";
	},
    getValue: "name",
    list: {
        match: {
            enabled: true
        }
    }
};

$("#breedInput").easyAutocomplete(breedOptions);

// Semantic UI Dropdown
$("select.dropdown").dropdown();

// Show/Hide Forms
var patientForm = document.querySelector("#patientForm");
var existingOwnerForm = document.querySelector("#existingOwnerForm");
var newOwnerForm = document.querySelector("#newOwnerForm");
var addExistingBtn = document.querySelector("#addExistingBtn");
var addNewBtn = document.querySelector("#addNewBtn");
var addPetBtn = document.querySelector("#addPetBtn");
var newOrExistngBtns = document.querySelector("#newOrExisitngBtns");
var ownerStep = document.querySelector("#ownerStep");
var confirmStep = document.querySelector("#confirmStep");
var petStep = document.querySelector("#petStep");
var confirmPage = document.querySelector("#confirmPage");
var confirmStep = document.querySelector("#confirmStep");

addExistingBtn.addEventListener("click", function(){
    existingOwnerForm.style.display = "inline";
    newOwnerForm.style.display = "none";
    addPetBtn.style.display = "inline";    
    addExistingBtn.classList.add("positive");
    addNewBtn.classList.remove("positive");      
});

addNewBtn.addEventListener("click", function(){
    newOwnerForm.style.display = "block";
    existingOwnerForm.style.display = "none";
    addPetBtn.style.display = "inline";    
    addNewBtn.classList.add("positive");
    addExistingBtn.classList.remove("positive");      
});

addPetBtn.addEventListener("click", function(){
    ownerStep.classList.add("completed");
    newOwnerForm.style.display = "none";
    existingOwnerForm.style.display = "none";
    newOrExistngBtns.style.display = "none";
    addPetBtn.style.display = "none";
    patientForm.style.display = "block";    
});

reviewBtn.addEventListener("click", function(){
    patientForm.style.display = "none";    
    confirmPage.style.display = "block";
    petStep.classList.add("completed");
    confirmStep.classList.remove("disabled");    
});