       async function consumablewithdrawaltransaction () {
        await  httpRequest('consumablewithdrawaltransaction.php')
    }
    
var consumablewithdrawaltransactionbtn = document.getElementById("consumablewithdrawaltransaction");
if (consumablewithdrawaltransactionbtn) consumablewithdrawaltransactionbtn.addEventListener("click", e=>consumablewithdrawaltransaction());