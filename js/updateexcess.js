       async function updateexcess () {
        await  httpRequest('updateexcess.php')
    }
    
var updateexcessbtn = document.getElementById("updateexcess");
if (updateexcessbtn) updateexcessbtn.addEventListener("click", e=>updateexcess());