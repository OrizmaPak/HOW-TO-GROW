       async function submittederrors () {
        await  httpRequest('submittederrors.php')
    }
    
var submittederrorsbtn = document.getElementById("submittederrors");
if (submittederrorsbtn) submittederrorsbtn.addEventListener("click", e=>submittederrors());