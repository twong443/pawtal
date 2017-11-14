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
// Semantic UI Dropdown
$("select.dropdown").dropdown();

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

// Show/Hide Existing & New Owner Forms
addExistingBtn.addEventListener("click", function(){
    existingOwnerForm.style.display = "inline";
    newOwnerForm.style.display = "none";  
    addExistingBtn.classList.add("positive");
    addNewBtn.classList.remove("positive");      
});

addNewBtn.addEventListener("click", function(){
    newOwnerForm.style.display = "block";
    existingOwnerForm.style.display = "none";  
    addNewBtn.classList.add("positive");
    addExistingBtn.classList.remove("positive");      
});