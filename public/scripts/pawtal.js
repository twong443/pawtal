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
	data: ["blue", "green", "pink", "red", "yellow"]
};

$("#basics").easyAutocomplete(options);