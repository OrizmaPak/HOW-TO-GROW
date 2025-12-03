       async function vieweditedservicecharge () {
        await  httpRequest('vieweditedservicecharge.php')
    }
    
var vieweditedservicechargebtn = document.getElementById("vieweditedservicecharge");
if (vieweditedservicechargebtn) vieweditedservicechargebtn.addEventListener("click", e=>vieweditedservicecharge());