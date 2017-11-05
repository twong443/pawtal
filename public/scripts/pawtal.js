//make rows into links
var rowUrls = document.querySelectorAll(".rowUrl");

rowUrls.forEach(function(row){
    var petId = row.attributes[1].textContent;
    row.addEventListener("click", function(){
        // alert(petId);
        window.location.assign("/patients/" + petId);
    });
});

// var options = {
// 	url: function(phrase) {
// 		return "api/countrySearch.php?phrase=" + phrase + "&format=json";
// 	},

// 	getValue: "firstName"
// };

// $("#ownersDb").easyAutocomplete(options);