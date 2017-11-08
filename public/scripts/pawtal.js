//make rows into links
var rowUrls = document.querySelectorAll(".rowUrl");
rowUrls.forEach(function(row){
    var petId = row.attributes[1].textContent;
    row.addEventListener("click", function(){
        // alert(petId);
        window.location.assign("/patients/" + petId);
    });
});

// make table sortable;
$('table').tablesort();

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
$('div.easy-autocomplete').removeAttr('style');

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
var reviewBtn = document.querySelector("#reviewBtn");
var ownerStep = document.querySelector("#ownerStep");
var confirmStep = document.querySelector("#confirmStep");
var petStep = document.querySelector("#petStep");
var confirmPage = document.querySelector("#confirmPage");
var confirmStep = document.querySelector("#confirmStep");
var ownerInput = document.querySelectorAll(".ownerInput");
var ownerDisplay = document.querySelector("#ownerDisplay");

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
    var ownerData = [];
    var ownerDisplayArr = [];
    patientForm.style.display = "none";    
    confirmPage.style.display = "block";
    petStep.classList.add("completed");
    confirmStep.classList.remove("disabled");
    ownerInput.forEach(function(data){
        ownerData.push(data.value);
    });
    for(var i=0; i < ownerData.length; i++){
        ownerDisplayArr.push('<li><span>' + ownerData[i] + '</span></li>');
    }
    ownerDisplay.innerHTML = ownerDisplayArr.join("");
});

//Input Values to View on Confirmation Page

$('#petNameInput').change(function() {
    $('#petNameDisplay').text($(this).val());
});
$('#petDobInput').change(function() {
    $('#petDobDisplay').text($(this).val());
});
$('#breedInput').change(function() {
    $('#breedDisplay').text($(this).val());
});
$('#colorInput').change(function() {
    $('#colorDisplay').text($(this).val());
});
$('#weightInput').change(function() {
    $('#weightDisplay').text($(this).val());
});
$("#petGenderInput").change(function() {
    var petGender = $('#petGenderInput option:selected').text();
    $('#petGenderDisplay').html(petGender);
});
$("#typeInput").change(function() {
    var type = $('#typeInput option:selected').text();
    $('#typeDisplay').html(type);
});