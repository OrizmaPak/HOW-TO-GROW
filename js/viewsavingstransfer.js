       async function viewsavingstransfer () {
        await  httpRequest('viewsavingstransfer.php')
    }
    
var viewsavingstransferbtn = document.getElementById("viewsavingstransfer");
if (viewsavingstransferbtn) viewsavingstransferbtn.addEventListener("click", e=>viewsavingstransfer());