       async function nonconsumablewithdrawaltransaction () {
        await  httpRequest('nonconsumablewithdrawaltransaction.php')
    }
    
var nonconsumablewithdrawaltransactionbtn = document.getElementById("nonconsumablewithdrawaltransaction");
if (nonconsumablewithdrawaltransactionbtn) nonconsumablewithdrawaltransactionbtn.addEventListener("click", e=>nonconsumablewithdrawaltransaction());