       async function bankingtransaction () {
        await  httpRequest('bankingtransaction.php')
    }
    
var bankingtransactionbtn = document.getElementById("bankingtransaction");
if (bankingtransactionbtn) bankingtransactionbtn.addEventListener("click", e=>bankingtransaction());