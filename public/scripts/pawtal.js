//make rows into links
var rowUrls = document.querySelectorAll(".rowUrl");

rowUrls.forEach(function(row){
    var petId = row.attributes[1].textContent;
    row.addEventListener("click", function(){
        // alert(petId);
        window.location.assign("/patients/" + petId);
    });
});

var options = {
	url: function(phrase) {
		return "/allOwnerNames";
	},
    getValue: "name",

    list: {
        onSelectItemEvent: function() {
            var ownerObject = $("#ownersDb").getSelectedItemData().owner;
            $("#data-holder").val(JSON.stringify(ownerObject)).trigger("change");
        }
    }
};

$("#ownersDb").easyAutocomplete(options);