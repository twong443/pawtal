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
var options = {
	url: function(phrase) {
		return "/allOwnerNames";
	},
    getValue: "name",

    // template: {
    //     type: "custom",
    //     method: function(value, item) {
    //         return item.firstName + " " + item.lastName + " " + item.phone;
    //     }
    // },

    list: {
        onSelectItemEvent: function() {
            var ownerObject = $("#ownersDb").getSelectedItemData().owner;
            $("#data-holder").val(JSON.stringify(ownerObject)).trigger("change");
        },
        match: {
            enabled: true
        }
    }
};

$("#ownersDb").easyAutocomplete(options);

// Add New Owner Slider & Accordion
$('.ui.checkbox').checkbox();
$('.ui.accordion').accordion();