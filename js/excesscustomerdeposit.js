       async function excesscustomerdepositexcesscustomerdeposit () {
        await  httpRequest('excesscustomerdeposit.php')
    }
    
var excesscustomerdepositbtn = document.getElementById("excesscustomerdeposit");
if (excesscustomerdepositbtn) excesscustomerdepositbtn.addEventListener("click", e=>excesscustomerdeposit());