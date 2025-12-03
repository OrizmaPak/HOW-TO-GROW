       async function registerwrongaccountentry () {
        await  httpRequest('registerwrongaccountentry.php')
    }
    
var registerwrongaccountentrybtn = document.getElementById("registerwrongaccountentry");
if (registerwrongaccountentrybtn) registerwrongaccountentrybtn.addEventListener("click", e=>registerwrongaccountentry());