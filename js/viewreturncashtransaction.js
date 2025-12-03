       async function viewreturncashtransaction () {
        await  httpRequest('viewreturncashtransaction.php')
    }
    
var viewreturncashtransactionbtn = document.getElementById("viewreturncashtransaction");
if (viewreturncashtransactionbtn) viewreturncashtransactionbtn.addEventListener("click", e=>viewreturncashtransaction());