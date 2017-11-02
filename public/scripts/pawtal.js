// //make rows into links
var rowUrls = document.querySelectorAll(".rowUrl");
    
for(var i=0; i<rowUrls.length; i++){
    var petId = rowUrls[i].attributes[1].textContent;
    rowUrls[i].addEventListener("click", function(){
        window.location.assign("/patients/" + petId);
    });
}