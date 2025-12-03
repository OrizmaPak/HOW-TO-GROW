       async function userconfirmtransaction () {
        await  httpRequest('userconfirmtransaction.php')
    }
    
var userconfirmtransactionbtn = document.getElementById("userconfirmtransaction");
if (userconfirmtransactionbtn) userconfirmtransactionbtn.addEventListener("click", e=>userconfirmtransaction());